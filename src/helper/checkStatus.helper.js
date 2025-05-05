const checkStatus = (status) => {
    const trueCode = [200, 201, 302]
    if (status == 400) {
        return {
            message: "Nhập tào lao là sai rồi bạn tôi ơi!",
            bool: false
        }
    } else if (status == 401) {
        return {
            message: "Ôi bạn ơi, bạn không thể sử dụng chức năng này!",
            bool: false
        }
    } else if (status == 403) {
        return {
            message: "Quên đăng nhập à bạn tôi!",
            bool: false
        }
    } else if (status == 404) {
        return {
            message: "Không tìm thấy hic hic!",
            bool: false
        }
    } else if (status == 500) {
        return {
            message: "Oops! Lỗi hệ thống!",
            bool: false
        }
    } else if (status == 418) {
        return {
            message: "Lỗi trong lúc khóa tài khoản!",
            bool: false
        }
    } else if (trueCode.includes(status)) {
        return {
            bool: true
        }
    } else {
        return {
            message: "Lỗi không xác định!",
            bool: false
        }
    }
}

module.exports = {
    checkStatus
}