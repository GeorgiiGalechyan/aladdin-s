class User {
  constructor(login, password, role) {
    this.login = login
    this.password = password

    this.isAdmin

    role = 'admin' ? (this.isAdmin = 1) : (this.isAdmin = 0)
  }

  addEmail() {}
  changePassword() {}
  deleteUser() {}
}
