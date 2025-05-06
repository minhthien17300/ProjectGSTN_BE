class USER {
  constructor(userName, pwd, phone, address, birthday, name, email, createdAt) {
    this.userName = userName;
    this.pwd = pwd;
    this.phone = phone;
    this.address = address;
    this.birthday = birthday;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }

  // Phương thức để ánh xạ document từ Firestore vào đối tượng User
  static fromFirestore(document) {
    const data = document.data();
    return new User(
      data.userName,
      data.pwd,
      data.phone,
      data.address,
      data.birthday,
      data.name,
      data.email,
      data.createdAt
    );
  }

  // Phương thức để chuyển đối tượng thành dữ liệu cho Firestore
  toFirestore() {
    return {
      userName: this.userName,
      pwd: this.pwd,
      phone: this.phone,
      address: this.address,
      birthday: this.birthday,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    };
  }
}

module.exports = USER;
