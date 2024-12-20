import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';

import type { Body_login_login_access_token,Message,NewPassword,Token,UserPublic,UpdatePassword,UserCreate,UserRegister,UsersPublic,UserUpdate,UserUpdateMe,ItemCreate,ItemPublic,ItemsPublic,ItemUpdate,CategoryCreate,CategoryResponse,CategoryUpdate,ProductCreate,ProductResponse,ProductUpdate,StudentCreate,StudentResponse,StudentUpdate } from './models';

export type TDataLoginLoginAccessToken = {
                formData: Body_login_login_access_token
                
            }
export type TDataLoginRecoverPassword = {
                email: string
                
            }
export type TDataLoginResetPassword = {
                requestBody: NewPassword
                
            }
export type TDataLoginRecoverPasswordHtmlContent = {
                email: string
                
            }

export class LoginService {

	/**
	 * Login Access Token
	 * OAuth2 compatible token login, get an access token for future requests
	 * @returns Token Successful Response
	 * @throws ApiError
	 */
	public static loginLoginAccessToken(data: TDataLoginLoginAccessToken): CancelablePromise<Token> {
		const {
formData,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/login/access-token',
			formData: formData,
			mediaType: 'application/x-www-form-urlencoded',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Test Token
	 * Test access token
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static loginTestToken(): CancelablePromise<UserPublic> {
				return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/login/test-token',
		});
	}

	/**
	 * Recover Password
	 * Password Recovery
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static loginRecoverPassword(data: TDataLoginRecoverPassword): CancelablePromise<Message> {
		const {
email,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/password-recovery/{email}',
			path: {
				email
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Reset Password
	 * Reset password
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static loginResetPassword(data: TDataLoginResetPassword): CancelablePromise<Message> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/reset-password/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Recover Password Html Content
	 * HTML Content for Password Recovery
	 * @returns string Successful Response
	 * @throws ApiError
	 */
	public static loginRecoverPasswordHtmlContent(data: TDataLoginRecoverPasswordHtmlContent): CancelablePromise<string> {
		const {
email,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/password-recovery-html-content/{email}',
			path: {
				email
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataUsersReadUsers = {
                limit?: number
skip?: number
                
            }
export type TDataUsersCreateUser = {
                requestBody: UserCreate
                
            }
export type TDataUsersUpdateUserMe = {
                requestBody: UserUpdateMe
                
            }
export type TDataUsersUpdatePasswordMe = {
                requestBody: UpdatePassword
                
            }
export type TDataUsersRegisterUser = {
                requestBody: UserRegister
                
            }
export type TDataUsersReadUserById = {
                userId: string
                
            }
export type TDataUsersUpdateUser = {
                requestBody: UserUpdate
userId: string
                
            }
export type TDataUsersDeleteUser = {
                userId: string
                
            }

export class UsersService {

	/**
	 * Read Users
	 * Retrieve users.
	 * @returns UsersPublic Successful Response
	 * @throws ApiError
	 */
	public static usersReadUsers(data: TDataUsersReadUsers = {}): CancelablePromise<UsersPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/users/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create User
	 * Create new user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static usersCreateUser(data: TDataUsersCreateUser): CancelablePromise<UserPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/users/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read User Me
	 * Get current user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static usersReadUserMe(): CancelablePromise<UserPublic> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/users/me',
		});
	}

	/**
	 * Delete User Me
	 * Delete own user.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static usersDeleteUserMe(): CancelablePromise<Message> {
				return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/users/me',
		});
	}

	/**
	 * Update User Me
	 * Update own user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static usersUpdateUserMe(data: TDataUsersUpdateUserMe): CancelablePromise<UserPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/api/v1/users/me',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Password Me
	 * Update own password.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static usersUpdatePasswordMe(data: TDataUsersUpdatePasswordMe): CancelablePromise<Message> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/api/v1/users/me/password',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Register User
	 * Create new user without the need to be logged in.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static usersRegisterUser(data: TDataUsersRegisterUser): CancelablePromise<UserPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/users/signup',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read User By Id
	 * Get a specific user by id.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static usersReadUserById(data: TDataUsersReadUserById): CancelablePromise<UserPublic> {
		const {
userId,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/users/{user_id}',
			path: {
				user_id: userId
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update User
	 * Update a user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static usersUpdateUser(data: TDataUsersUpdateUser): CancelablePromise<UserPublic> {
		const {
requestBody,
userId,
} = data;
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/api/v1/users/{user_id}',
			path: {
				user_id: userId
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete User
	 * Delete a user.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static usersDeleteUser(data: TDataUsersDeleteUser): CancelablePromise<Message> {
		const {
userId,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/users/{user_id}',
			path: {
				user_id: userId
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataUtilsTestEmail = {
                emailTo: string
                
            }

export class UtilsService {

	/**
	 * Test Email
	 * Test emails.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static utilsTestEmail(data: TDataUtilsTestEmail): CancelablePromise<Message> {
		const {
emailTo,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/utils/test-email/',
			query: {
				email_to: emailTo
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Health Check
	 * @returns boolean Successful Response
	 * @throws ApiError
	 */
	public static utilsHealthCheck(): CancelablePromise<boolean> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/utils/health-check/',
		});
	}

}

export type TDataItemsReadItems = {
                limit?: number
skip?: number
                
            }
export type TDataItemsCreateItem = {
                requestBody: ItemCreate
                
            }
export type TDataItemsReadItem = {
                id: string
                
            }
export type TDataItemsUpdateItem = {
                id: string
requestBody: ItemUpdate
                
            }
export type TDataItemsDeleteItem = {
                id: string
                
            }

export class ItemsService {

	/**
	 * Read Items
	 * Retrieve items.
	 * @returns ItemsPublic Successful Response
	 * @throws ApiError
	 */
	public static itemsReadItems(data: TDataItemsReadItems = {}): CancelablePromise<ItemsPublic> {
		const {
limit = 100,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/items/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Item
	 * Create new item.
	 * @returns ItemPublic Successful Response
	 * @throws ApiError
	 */
	public static itemsCreateItem(data: TDataItemsCreateItem): CancelablePromise<ItemPublic> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/items/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Item
	 * Get item by ID.
	 * @returns ItemPublic Successful Response
	 * @throws ApiError
	 */
	public static itemsReadItem(data: TDataItemsReadItem): CancelablePromise<ItemPublic> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/items/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Item
	 * Update an item.
	 * @returns ItemPublic Successful Response
	 * @throws ApiError
	 */
	public static itemsUpdateItem(data: TDataItemsUpdateItem): CancelablePromise<ItemPublic> {
		const {
id,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/items/{id}',
			path: {
				id
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Item
	 * Delete an item.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static itemsDeleteItem(data: TDataItemsDeleteItem): CancelablePromise<Message> {
		const {
id,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/items/{id}',
			path: {
				id
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataCategoriesReadCategories = {
                limit?: number
skip?: number
                
            }
export type TDataCategoriesCreateCategory = {
                requestBody: CategoryCreate
                
            }
export type TDataCategoriesReadCategory = {
                categoryId: string
                
            }
export type TDataCategoriesUpdateCategory = {
                categoryId: string
requestBody: CategoryUpdate
                
            }
export type TDataCategoriesDeleteCategory = {
                categoryId: string
                
            }

export class CategoriesService {

	/**
	 * Read Categories
	 * @returns CategoryResponse Successful Response
	 * @throws ApiError
	 */
	public static categoriesReadCategories(data: TDataCategoriesReadCategories = {}): CancelablePromise<Array<CategoryResponse>> {
		const {
limit = 10,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/categories/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Category
	 * @returns CategoryResponse Successful Response
	 * @throws ApiError
	 */
	public static categoriesCreateCategory(data: TDataCategoriesCreateCategory): CancelablePromise<CategoryResponse> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/categories/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Category
	 * @returns CategoryResponse Successful Response
	 * @throws ApiError
	 */
	public static categoriesReadCategory(data: TDataCategoriesReadCategory): CancelablePromise<CategoryResponse> {
		const {
categoryId,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/categories/{category_id}',
			path: {
				category_id: categoryId
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Category
	 * @returns CategoryResponse Successful Response
	 * @throws ApiError
	 */
	public static categoriesUpdateCategory(data: TDataCategoriesUpdateCategory): CancelablePromise<CategoryResponse> {
		const {
categoryId,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/categories/{category_id}',
			path: {
				category_id: categoryId
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Category
	 * @returns CategoryResponse Successful Response
	 * @throws ApiError
	 */
	public static categoriesDeleteCategory(data: TDataCategoriesDeleteCategory): CancelablePromise<CategoryResponse> {
		const {
categoryId,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/categories/{category_id}',
			path: {
				category_id: categoryId
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataProductsReadProducts = {
                limit?: number
skip?: number
                
            }
export type TDataProductsCreateProduct = {
                requestBody: ProductCreate
                
            }
export type TDataProductsReadProduct = {
                productId: string
                
            }
export type TDataProductsUpdateProduct = {
                productId: string
requestBody: ProductUpdate
                
            }
export type TDataProductsDeleteProduct = {
                productId: string
                
            }

export class ProductsService {

	/**
	 * Read Products
	 * @returns ProductResponse Successful Response
	 * @throws ApiError
	 */
	public static productsReadProducts(data: TDataProductsReadProducts = {}): CancelablePromise<Array<ProductResponse>> {
		const {
limit = 10,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/products/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Product
	 * @returns ProductResponse Successful Response
	 * @throws ApiError
	 */
	public static productsCreateProduct(data: TDataProductsCreateProduct): CancelablePromise<ProductResponse> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/products/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Product
	 * @returns ProductResponse Successful Response
	 * @throws ApiError
	 */
	public static productsReadProduct(data: TDataProductsReadProduct): CancelablePromise<ProductResponse> {
		const {
productId,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/products/{product_id}',
			path: {
				product_id: productId
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Product
	 * @returns ProductResponse Successful Response
	 * @throws ApiError
	 */
	public static productsUpdateProduct(data: TDataProductsUpdateProduct): CancelablePromise<ProductResponse> {
		const {
productId,
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/products/{product_id}',
			path: {
				product_id: productId
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Product
	 * @returns ProductResponse Successful Response
	 * @throws ApiError
	 */
	public static productsDeleteProduct(data: TDataProductsDeleteProduct): CancelablePromise<ProductResponse> {
		const {
productId,
} = data;
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/products/{product_id}',
			path: {
				product_id: productId
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

}

export type TDataStudentsReadStudents = {
                limit?: number
skip?: number
                
            }
export type TDataStudentsCreateStudent = {
                requestBody: StudentCreate
                
            }
export type TDataStudentsReadStudent = {
                studentId: string
                
            }
export type TDataStudentsUpdateStudent = {
                requestBody: StudentUpdate
studentId: string
                
            }
export type TDataStudentsUpdateStudentSection = {
                requestBody: StudentUpdate
studentId: string
                
            }

export class StudentsService {

	/**
	 * Read Students
	 * @returns StudentResponse Successful Response
	 * @throws ApiError
	 */
	public static studentsReadStudents(data: TDataStudentsReadStudents = {}): CancelablePromise<Array<StudentResponse>> {
		const {
limit = 10,
skip = 0,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/students/',
			query: {
				skip, limit
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Student
	 * @returns StudentResponse Successful Response
	 * @throws ApiError
	 */
	public static studentsCreateStudent(data: TDataStudentsCreateStudent): CancelablePromise<StudentResponse> {
		const {
requestBody,
} = data;
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/students/',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read My Student
	 * @returns StudentResponse Successful Response
	 * @throws ApiError
	 */
	public static studentsReadMyStudent(): CancelablePromise<StudentResponse> {
				return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/students/me',
		});
	}

	/**
	 * Read Student
	 * @returns StudentResponse Successful Response
	 * @throws ApiError
	 */
	public static studentsReadStudent(data: TDataStudentsReadStudent): CancelablePromise<StudentResponse> {
		const {
studentId,
} = data;
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/students/{student_id}',
			path: {
				student_id: studentId
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Student
	 * @returns StudentResponse Successful Response
	 * @throws ApiError
	 */
	public static studentsUpdateStudent(data: TDataStudentsUpdateStudent): CancelablePromise<StudentResponse> {
		const {
requestBody,
studentId,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/students/{student_id}',
			path: {
				student_id: studentId
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Student Section
	 * @returns StudentResponse Successful Response
	 * @throws ApiError
	 */
	public static studentsUpdateStudentSection(data: TDataStudentsUpdateStudentSection): CancelablePromise<StudentResponse> {
		const {
requestBody,
studentId,
} = data;
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/students/{section}/{student_id}',
			path: {
				student_id: studentId
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Validation Error`,
			},
		});
	}

}