/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CitiesEntity } from './CitiesEntity.ts';
import type { ProductGender } from './ProductGender.ts';
import type { ProductType } from './ProductType.ts';
import type { SpendingEntity } from './SpendingEntity.ts';
export type ProductsEntity = {
	id: number;
	name: string;
	brand: string;
	description: string;
	gender: ProductGender;
	price: number;
	type: ProductType;
	image: string;
	city: CitiesEntity;
	spending: SpendingEntity;
};

