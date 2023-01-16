module.exports = class ApiError extends Error {
    status: number;
    errors: Error[];
    constructor(status: number, message: string, errors: Error[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message: string, errors: Error[] = []) {
        return new ApiError(400, message, errors);
    }

    static Conflict(message: string) {
        return new ApiError(409, message);
    }

    static UnauthorizedError() {
        return new ApiError(401, "Пользователь не авторизован");
    }

    static AccessDenied() {
        return new ApiError(403, "Нет доступа к этому ресурсу");
    }
}