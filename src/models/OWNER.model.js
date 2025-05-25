class OWNER {
  constructor(userId, bookId, bookMark, lastRead) {
    this.userId = userId;
    this.bookId = bookId;
    this.bookMark = bookMark;
    this.lastRead = lastRead;
  }

  // Phương thức để ánh xạ document từ Firestore vào đối tượng User
  static fromFirestore(document) {
    const data = document.data();
    if (!data) return null;

    return new OWNER(data.userId, data.bookId, data.bookMark, data.lastRead);
  }

  // Phương thức để chuyển đối tượng thành dữ liệu cho Firestore
  toFirestore() {
    return {
      userId: this.userId,
      bookId: this.bookId,
      bookMark: this.bookMark,
      lastRead: this.lastRead,
    };
  }
}

module.exports = OWNER;
