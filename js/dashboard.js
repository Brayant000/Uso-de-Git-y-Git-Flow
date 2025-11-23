class UserDashboard {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.loadUserData();
        this.renderUsers();
        this.setupEventListeners();
        
        console.log('Dashboard inicializado. Usuarios:', this.users.length);
    }

    checkAuthentication() {
        if (!this.currentUser) {
            alert('⚠️ Debes iniciar sesión para acceder al dashboard');
            window.location.href = 'login.html';
            return;
        }
    }

    loadUserData() {
        // Actualizar bienvenida
        const welcomeElement = document.getElementById('userWelcome');
        if (welcomeElement && this.currentUser) {
            welcomeElement.textContent = `Bienvenido, ${this.currentUser.name}`;
        }

        // Actualizar estadísticas
        this.updateStats();
    }

    updateStats() {
        const totalUsers = this.users.length;
        const today = new Date().toDateString();
        const todayUsers = this.users.filter(user => 
            new Date(user.createdAt).toDateString() === today
        ).length;

        document.getElementById('totalUsers').textContent = totalUsers;
        document.getElementById('todayUsers').textContent = todayUsers;
    }

    renderUsers() {
        const usersList = document.getElementById('usersList');
        
        if (!usersList) return;

        usersList.innerHTML = '';

        if (this.users.length === 0) {
            usersList.innerHTML = `
                <div class="no-users">
                    <h3>📭 No hay usuarios registrados</h3>
                    <p>Registra el primer usuario desde la página de registro</p>
                    <a href="index.html" class="btn btn-primary" style="width: auto; display: inline-block; margin-top: 10px;">
                        Ir al Registro
                    </a>
                </div>
            `;
            return;
        }

        this.users.forEach(user => {
            const userCard = this.createUserCard(user);
            usersList.appendChild(userCard);
        });
    }

    createUserCard(user) {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
            <h3>👤 ${user.name}</h3>
            <p><strong>📧 Email:</strong> ${user.email}</p>
            <p><strong>📞 Teléfono:</strong> ${user.phone || 'No especificado'}</p>
            <p><strong>🆔 ID:</strong> ${user.id}</p>
            <p><strong>📅 Registrado:</strong> ${this.formatDate(user.createdAt)}</p>
            <p><strong>✏️ Actualizado:</strong> ${this.formatDate(user.updatedAt)}</p>
            
            <div class="user-actions">
                <button class="btn-edit" data-id="${user.id}">
                    ✏️ Editar
                </button>
                <button class="btn-delete" data-id="${user.id}">
                    🗑️ Eliminar
                </button>
            </div>
        `;
        return card;
    }

    formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    setupEventListeners() {
        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                AuthSystem.logout();
            }
        });

        // Refresh
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.users = JSON.parse(localStorage.getItem('users')) || [];
            this.renderUsers();
            this.updateStats();
            this.showToast('✅ Lista actualizada');
        });

        // Event delegation para botones de editar/eliminar
        document.getElementById('usersList').addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-edit')) {
                this.editUser(e.target.dataset.id);
            }
            if (e.target.classList.contains('btn-delete')) {
                this.deleteUser(e.target.dataset.id);
            }
        });
    }

    editUser(userId) {
        console.log('Editando usuario:', userId);
        this.showToast('🛠️ Funcionalidad de edición en desarrollo');
    }

    deleteUser(userId) {
        console.log('Eliminando usuario:', userId);
        this.showToast('🛠️ Funcionalidad de eliminación en desarrollo');
    }

    showToast(message) {
        // Toast simple para feedback
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000;
            font-weight: 500;
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    }
}

// Inicializar dashboard
class UserDashboard {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.loadUserData();
        this.renderUsers();
        this.setupEventListeners();

        console.log('Dashboard inicializado. Usuarios:', this.users.length);
    }

    checkAuthentication() {
        if (!this.currentUser) {
            alert('⚠️ Debes iniciar sesión para acceder al dashboard');
            window.location.href = 'login.html';
            return;
        }
    }

    loadUserData() {
        // Actualizar bienvenida
        const welcomeElement = document.getElementById('userWelcome');
        if (welcomeElement && this.currentUser) {
            welcomeElement.textContent = `Bienvenido, ${this.currentUser.name}`;
        }

        // Actualizar estadísticas
        this.updateStats();
    }

    updateStats() {
        const totalUsers = this.users.length;
        const today = new Date().toDateString();
        const todayUsers = this.users.filter(user =>
            new Date(user.createdAt).toDateString() === today
        ).length;

        document.getElementById('totalUsers').textContent = totalUsers;
        document.getElementById('todayUsers').textContent = todayUsers;
    }

    renderUsers() {
        const usersList = document.getElementById('usersList');

        if (!usersList) return;

        usersList.innerHTML = '';

        if (this.users.length === 0) {
            usersList.innerHTML = `
                <div class="no-users">
                    <h3>📭 No hay usuarios registrados</h3>
                    <p>Registra el primer usuario desde la página de registro</p>
                    <a href="index.html" class="btn btn-primary" style="width: auto; display: inline-block; margin-top: 10px;">
                        Ir al Registro
                    </a>
                </div>
            `;
            return;
        }

        this.users.forEach(user => {
            const userCard = this.createUserCard(user);
            usersList.appendChild(userCard);
        });
    }

    createUserCard(user) {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
            <h3>👤 ${user.name}</h3>
            <p><strong>📧 Email:</strong> ${user.email}</p>
            <p><strong>📞 Teléfono:</strong> ${user.phone || 'No especificado'}</p>
            <p><strong>🆔 ID:</strong> ${user.id}</p>
            <p><strong>📅 Registrado:</strong> ${this.formatDate(user.createdAt)}</p>
            <p><strong>✏️ Actualizado:</strong> ${this.formatDate(user.updatedAt)}</p>

            <div class="user-actions">
                <button class="btn-edit" data-id="${user.id}">
                    ✏️ Editar
                </button>
                <button class="btn-delete" data-id="${user.id}">
                    🗑️ Eliminar
                </button>
            </div>
        `;
        return card;
    }

    formatDate(dateString) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    setupEventListeners() {
        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            // Asumiendo que AuthSystem.logout() limpia el localStorage y redirige.
            // Si AuthSystem no existe, reemplaza con: localStorage.removeItem('currentUser'); window.location.href = 'login.html';
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                // AuthSystem.logout(); // Descomenta si usas una clase AuthSystem
                localStorage.removeItem('currentUser'); 
                window.location.href = 'login.html';
            }
        });

        // Refresh
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.users = JSON.parse(localStorage.getItem('users')) || [];
            this.renderUsers();
            this.updateStats();
            this.showToast('✅ Lista actualizada');
        });

        // Event delegation para botones de editar/eliminar
        document.getElementById('usersList').addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-edit')) {
                this.editUser(e.target.dataset.id);
            }
            if (e.target.classList.contains('btn-delete')) {
                this.deleteUser(e.target.dataset.id);
            }
        });
        
        // Modal events (para la edición)
        document.getElementById('editUserForm').addEventListener('submit', (e) => this.handleEditSubmit(e));
        document.getElementById('cancelEdit').addEventListener('click', () => this.hideEditModal());
        
        // El selector del botón de cerrar suele ser una clase, ej. '.close-modal' o un ID.
        // Asegúrate de que este selector exista en tu HTML del modal.
        const closeModalBtn = document.querySelector('.close-modal');
        if(closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.hideEditModal());
        }

        // Cerrar modal al hacer click fuera
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.hideEditModal();
            }
        });
    }

    // --- MÉTODOS DE ACTUALIZACIÓN (UPDATE) ---

    editUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            // Llenar el formulario con datos actuales
            document.getElementById('editUserId').value = user.id;
            document.getElementById('editUserName').value = user.name;
            document.getElementById('editUserEmail').value = user.email;
            document.getElementById('editUserPhone').value = user.phone || '';

            this.showEditModal();
            console.log('Preparando edición de usuario:', user);
        }
    }

    showEditModal() {
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.style.display = 'block';
            // Enfocar el primer campo
            setTimeout(() => {
                document.getElementById('editUserName').focus();
            }, 100);
        }
    }

    hideEditModal() {
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.style.display = 'none';
        }
        document.getElementById('editUserForm').reset();
    }

    handleEditSubmit(e) {
        e.preventDefault();

        const userId = document.getElementById('editUserId').value;
        const userData = {
            name: document.getElementById('editUserName').value.trim(),
            email: document.getElementById('editUserEmail').value.trim().toLowerCase(),
            phone: document.getElementById('editUserPhone').value.trim(),
            updatedAt: new Date().toISOString()
        };

        if (this.validateEditData(userId, userData)) {
            this.updateUser(userId, userData);
        }
    }

    validateEditData(userId, userData) {
        // Validar campos obligatorios
        if (!userData.name || !userData.email) {
            alert('❌ Nombre y email son campos obligatorios');
            return false;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            alert('❌ Por favor ingresa un email válido');
            return false;
        }

        // Validar que el email no esté duplicado (excluyendo el usuario actual)
        const existingUser = this.users.find(user =>
            user.email === userData.email && user.id !== userId
        );

        if (existingUser) {
            alert('❌ El email ya está registrado por otro usuario');
            return false;
        }

        return true;
    }

    updateUser(userId, userData) {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            // Mantener datos existentes y actualizar solo los modificados
            this.users[userIndex] = {
                ...this.users[userIndex],
                ...userData
            };

            localStorage.setItem('users', JSON.stringify(this.users));
            this.hideEditModal();
            this.renderUsers();
            this.updateStats();
            this.showToast('✅ Usuario actualizado exitosamente!');

            console.log('Usuario actualizado:', this.users[userIndex]);
        }
    }

    // --- MÉTODOS DE ELIMINACIÓN (DELETE) ---

    deleteUser(userId) {
        if (!confirm('🚨 ¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
            return;
        }

        const initialLength = this.users.length;
        // Filtrar el array para crear uno nuevo sin el usuario a eliminar
        this.users = this.users.filter(user => user.id !== userId);

        if (this.users.length < initialLength) {
            localStorage.setItem('users', JSON.stringify(this.users));
            this.renderUsers(); // Refrescar la lista en el DOM
            this.updateStats(); // Actualizar el conteo de usuarios
            this.showToast('🗑️ Usuario eliminado exitosamente.');
            console.log('Usuario eliminado:', userId);
        } else {
            this.showToast('❌ Error: No se encontró el usuario para eliminar.');
        }
    }
    
    // --- MÉTODO DE FEEDBACK ---

    showToast(message) {
        // Toast simple para feedback
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000;
            font-weight: 500;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    new UserDashboard(); 
});
document.addEventListener('DOMContentLoaded', () => {

});
