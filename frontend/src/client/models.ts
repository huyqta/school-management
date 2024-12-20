export type Body_login_login_access_token = {
	grant_type?: string | null;
	username: string;
	password: string;
	scope?: string;
	client_id?: string | null;
	client_secret?: string | null;
};



export type CategoryCreate = {
	name: string;
	description?: string | null;
};



export type CategoryResponse = {
	name: string;
	description?: string | null;
	id: string;
	products?: Array<ProductResponse> | null;
};



export type CategoryUpdate = {
	name: string;
	description?: string | null;
};



export type HTTPValidationError = {
	detail?: Array<ValidationError>;
};



export type ItemCreate = {
	title: string;
	description?: string | null;
};



export type ItemPublic = {
	title: string;
	description?: string | null;
	id: string;
	owner_id: string;
};



export type ItemUpdate = {
	title?: string | null;
	description?: string | null;
};



export type ItemsPublic = {
	data: Array<ItemPublic>;
	count: number;
};



export type Message = {
	message: string;
};



export type NewPassword = {
	token: string;
	new_password: string;
};



export type ProductCreate = {
	name: string;
	description?: string | null;
	price: number;
	category_id: string;
};



export type ProductResponse = {
	name: string;
	description?: string | null;
	price: number;
	id: string;
	category_id: string;
};



export type ProductUpdate = {
	name: string;
	description?: string | null;
	price: number;
	category_id?: string | null;
};



export type StudentCreate = {
	user_id: string;
	phone?: string | null;
	address?: string | null;
	dob?: string | null;
	description?: string | null;
	json_data?: string | null;
};



export type StudentResponse = {
	user_id: string;
	phone?: string | null;
	address?: string | null;
	dob?: string | null;
	description?: string | null;
	json_data?: string | null;
	id: string;
};



export type StudentUpdate = {
	user_id: string;
	phone?: string | null;
	address?: string | null;
	dob?: string | null;
	description?: string | null;
	json_data?: string | null;
};



export type Token = {
	access_token: string;
	token_type?: string;
};



export type UpdatePassword = {
	current_password: string;
	new_password: string;
};



export type UserCreate = {
	email: string;
	is_active?: boolean;
	is_superuser?: boolean;
	full_name?: string | null;
	password: string;
};



export type UserPublic = {
	email: string;
	is_active?: boolean;
	is_superuser?: boolean;
	full_name?: string | null;
	id: string;
};



export type UserRegister = {
	email: string;
	password: string;
	full_name?: string | null;
};



export type UserUpdate = {
	email?: string | null;
	is_active?: boolean;
	is_superuser?: boolean;
	full_name?: string | null;
	password?: string | null;
};



export type UserUpdateMe = {
	full_name?: string | null;
	email?: string | null;
};



export type UsersPublic = {
	data: Array<UserPublic>;
	count: number;
};



export type ValidationError = {
	loc: Array<string | number>;
	msg: string;
	type: string;
};

