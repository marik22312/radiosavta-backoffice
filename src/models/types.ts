export interface ModelWithTimestamps {
	created_at: string;
	updated_at: string;
}

export interface IUser extends ModelWithTimestamps {
	id: string;
	name: string;
	quote: string;
	location: string;
	profile_image: string;
	email: string;
}

export interface IProgram extends ModelWithTimestamps {
	id: string;
	name_en: string;
	name_he?: string;
	description: string;
	cover_image: string;
	is_displayed?: boolean
}
