class BOOK {
  constructor(
    author,
    category,
    description,
    grade,
    img,
    link,
    name,
    page,
    price,
    isDelete,
    createdAt
  ) {
    this.author = author;
    this.category = category;
    this.description = description;
    this.grade = grade;
    this.img = img;
    this.link = link;
    this.name = name;
    this.page = page;
    this.price = price;
    this.isDelete = isDelete;
    this.createdAt = createdAt;
  }

  // Phương thức để ánh xạ document từ Firestore vào đối tượng User
  static fromFirestore(document) {
    const data = document.data();
    if (!data) return null;

    return new BOOK(
      data.author,
      data.category,
      data.description,
      data.grade,
      data.img,
      data.link,
      data.name,
      data.page,
      data.price,
      data.isDelete,
      data.createdAt
    );
  }

  // Phương thức để chuyển đối tượng thành dữ liệu cho Firestore
  toFirestore() {
    return {
      author: this.author,
      category: this.category,
      description: this.description,
      grade: this.grade,
      img: this.img,
      link: this.link,
      name: this.name,
      page: this.page,
      price: this.price,
      isDelete: this.isDelete,
      createdAt: this.createdAt,
    };
  }
}

module.exports = BOOK;
