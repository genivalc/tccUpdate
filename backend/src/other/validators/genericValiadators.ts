import { HttpException } from "@nestjs/common";
import { VALIDATORS_ERRORS } from "src/other/constants/constants";
import { FEEDBACK_TYPES } from "../../feedbacks/enum/type.enum";

const {
    EMPTY,
    TEXT,
    FINGERPRINT,
    DEVICE,
    PAGE,
    API_KEY,
    UNKNOW_FEEDBACK,
    APIKEY_NOT_PROVIDED,
    EMAIL,
    FEEDBACK_UPDATE,
    NAME,
    NOT_FOUND,
    PASSWORD,
    UNAUTHORIZED,
    USER_CREATED,
    USER_UPDATE,
    ID
} = VALIDATORS_ERRORS

export class GenericValidators {
    validateRequireCreateFeedback({ body }) {
        console.warn(body)
        const { text, fingerprint, type, apiKey, device, page } = body
        if (!type) {
            throw new HttpException(EMPTY, 400);
        }
        if (!text) {
            throw new HttpException(TEXT, 400);
        }
        if (!fingerprint) {
            throw new HttpException(FINGERPRINT, 400);
        }
        if (!device) {
            throw new HttpException(DEVICE, 400);
        }
        if (!page) {
            throw new HttpException(PAGE, 400);
        }
        if (!apiKey) {
            throw new HttpException(API_KEY, 400);
        }
        console.warn(FEEDBACK_TYPES[String(type).toUpperCase()])
        if (!FEEDBACK_TYPES[String(type).toUpperCase()]) {
            throw new HttpException(UNKNOW_FEEDBACK, 422);
        }
        return true
    }

    validateRequireGetFeedback(id: string) {
        if (!id) {
            throw new HttpException(ID, 400);
        }
        return true
    }

    validateRequireGetSummaryFeedback(id: string, type) {
        this.validateRequireGetFeedback(id)

        console.warn(!FEEDBACK_TYPES[String(type?.type).toUpperCase()])
        if (!FEEDBACK_TYPES[String(type?.type).toUpperCase()]) {
            throw new HttpException(UNKNOW_FEEDBACK, 422);
        }
        return true
    }

    validateRequireUpdateFeedback(id: string, body) {
        this.validateRequireGetFeedback(id)

        this.validateRequireCreateFeedback({ body })
        return true
    }

    validateRequireCreateUsers({ body }) {
        const { name, email, password, apiKey } = body

        if (!name) {
            throw new HttpException(NAME, 400);
        }
        if (!email) {
            throw new HttpException(EMAIL, 400);
        }
        if (!password) {
            throw new HttpException(PASSWORD, 400);
        }
        if (!apiKey) {
            throw new HttpException(API_KEY, 400);
        }
        return true
    }

    validateRequireGetUser(id: string) {
        if (!id) {
            throw new HttpException(ID, 400);
        }
        return true
    }

    validateRequireUpdateUser(id: string, body) {
        this.validateRequireGetUser(id)

        this.validateRequireCreateUsers({ body })
        return true
    }
}