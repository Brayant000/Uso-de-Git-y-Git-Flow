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
document.addEventListener('DOMContentLoaded', () => {
    new UserDashboard();
});