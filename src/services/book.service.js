const BOOK = require("../models/BOOK.model");
const OWNER = require("../models/OWNER.model");
const uploadImageHelper = require("../helper/uploadImage.helper");
const { db } = require("../config/firebase");
const bookRef = db.collection("BOOK");
const ownerRef = db.collection("OWNER");
const { createBookToken, verifyBookToken } = require("../services/jwt.service");

exports.addBookAsync = async (body) => {
  try {
    const {
      name,
      description,
      author,
      grade,
      category,
      page,
      price,
      img,
      link,
    } = body;
    const bookExist = await findBookByFieldAsync("name", name);
    if (!bookExist.empty) {
      return {
        message: "Sách đã tồn tại!",
        success: false,
      };
    }

    const newBook = new BOOK(
      author,
      category,
      description,
      grade,
      img,
      link,
      name,
      page,
      price,
      false,
      admin.firestore.FieldValue.serverTimestamp()
    );
    await addBookAsync(newBook);
    return {
      message: "Tạo thành công!",
      success: true,
      data: newBook,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.editBookAsync = async (body) => {
  try {
    const {
      id,
      name,
      description,
      author,
      grade,
      category,
      page,
      price,
      imgUrl,
      link,
    } = body;

    const bookExist = await getBookDetailAsync(id);
    if (bookExist.empty) {
      return {
        message: "Sách không tồn tại!",
        success: false,
      };
    }

    let urlList = "";

    if (images) {
      urlList = await uploadImageHelper.uploadImageAsync(images, bookExist.id);
    }

    bookExist.update({
      name: name,
      category: category,
      description: description,
      author: author,
      grade: grade,
      page: page,
      price: price,
      img: [...img, ...imgUrl],
      link: link,
    });

    return {
      message: "Sửa đổi thành công!",
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "Sửa đổi không thành công!",
      success: false,
    };
  }
};

exports.deleteBookAsync = async (id) => {
  try {
    const docRef = bookRef.doc(id);
    await docRef.update({
      isDelete: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return {
      message: "Xóa thành công!",
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      message: "Xóa không thành công!",
      success: false,
    };
  }
};

exports.getALLBookAsync = async () => {
  try {
    const books = await bookRef.where("isDelete", "==", false).get();
    return books.docs.map(BOOK.fromFirestore);
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.getBookDetailAsync = async (id) => {
  try {
    const book = await bookRef.doc(id).get();
    return BOOK.fromFirestore(book);
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.findBookByFieldAsync = async (field, value) => {
  try {
    return await bookRef
      .where(field, "==", value)
      .where("isDelete", "==", false)
      .get();
  } catch (error) {
    console.log(error);
  }
};

exports.findBookByNameAsync = async (name) => {
  try {
    return await bookRef.where(field, "==", value).get();
  } catch (error) {
    console.log(error);
  }
};

exports.fetchPage = async (category, lastVisibleDoc = null, pageSize = 4) => {
  try {
    let query = bookRef // Collection bạn muốn truy vấn
      .where("category", "==", category)
      .orderBy("name") // Sắp xếp theo field "name"
      .limit(pageSize); // Giới hạn số lượng document mỗi trang

    // Nếu có document cuối cùng của trang trước, sử dụng startAfter để phân trang
    if (lastVisibleDoc) {
      query = query.startAfter(lastVisibleDoc);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      console.log("Không có dữ liệu.");
      return [];
    }

    // Lấy kết quả dữ liệu
    const data = snapshot.docs.map((doc) => doc.data());

    // Lưu lại document cuối cùng để phân trang cho lần tiếp theo
    // const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    let lastVisibleNameNext = null;

    if (snapshot.docs.length > 0) {
      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
      lastVisibleNameNext = lastVisibleDoc.get("name");
    }

    console.log("Dữ liệu trang hiện tại:", data);
    return {
      message: "Dữ liệu trang hiện tại:",
      data: {
        bookData: data,
        lastVisibleName: lastVisibleNameNext,
      },
      success: true,
    };
  } catch (error) {
    console.error("Lỗi khi truy vấn Firestore:", error);
    return {
      message: "Internal System Error",
      success: false,
    };
  }
};

exports.confirmBuyBookAsync = async (body) => {
  try {
    const { bookId } = body;
    const token = createBookToken(bookId);

    return {
      message: "Sao chép mã bên dưới và nhập mã để thêm sách!",
      data: token,
      success: true,
    };
  } catch (error) {
    console.error("Lỗi tạo token:", error);
    return {
      mssage: "Mua sách không thành công!",
      success: false,
    };
  }
};

exports.addBookToLibraryAsync = async (userId, bookId) => {
  try {
    const ownerExist = await ownerRef
      .where("userId", "==", userId)
      .where("bookId", "==", bookId)
      .get();
    if (!ownerExist.empty) {
      return {
        massage: "Bạn đã sở hữu sách này rồi!",
        success: false,
      };
    }

    const newOwner = new OWNER(
      userId,
      bookId,
      0,
      admin.firestore.Timestamp.now()
    );

    await addOwnerAsync(newOwner);

    return {
      message: "Sao chép mã bên dưới và nhập mã để thêm sách!",
      data: token,
      success: true,
    };
  } catch (error) {
    console.error("Lỗi tạo token:", error);
    return {
      mssage: "Mua sách không thành công!",
      success: false,
    };
  }
};

const addBookAsync = async (bookData) => {
  try {
    await bookRef.add(bookData.toFirestore());
    return bookRef.id;
  } catch (error) {
    console.log(error);
  }
};

const findOwnerbyFieldAsync = async (field, value) => {
  try {
    return await ownerRef.where(field, "==", value).get();
  } catch (error) {
    console.log(error);
  }
};

const addOwnerAsync = async (ownerData) => {
  try {
    await ownerRef.add(ownerData.toFirestore());
    return bookRef.id;
  } catch (error) {
    console.log(error);
  }
};
