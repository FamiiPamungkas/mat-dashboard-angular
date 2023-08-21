/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2023-08-21 13:57:11.

export interface MenuDTO {
  id: number;
  authority: string;
  name: string;
  description: string;
  link: string;
  group: string;
  visible: boolean;
  icon: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  children: MenuDTO[];
  authorities: string[];
  seq: number;
}

export interface RoleDTO {
  id: number;
  authority: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  menus: MenuDTO[];
}

export interface SimpleMenu {
  id: number;
  authority: string;
  name: string;
  description: string;
  link: string;
  group: string;
  visible: boolean;
  icon: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  parent: SimpleMenu;
  seq: number;
}

export interface SimpleUser {
  id: number;
  username: string;
  fullname: string;
  active: boolean;
}

export interface UserAuthDTO {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  username: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  roles: RoleDTO[];
  treeMenus: MenuDTO[];
}

export interface UserDTO {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  username: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  roles: RoleDTO[];
}

export interface UserFormRequest {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  username: string;
  password: string;
  email: string;
  active: boolean;
  roles: RoleDTO[];
}

export interface BaseEntity extends Serializable {
  id: number;
  active: boolean;
  createAt: Date;
  updatedAt: Date;
}

export interface Menu extends BaseEntity {
  authority: string;
  name: string;
  description: string;
  link: string;
  group: string;
  seq: number;
  visible: boolean;
  icon: string;
  parent: Menu;
  children: Menu[];
  authorities: string[];
}

export interface MenuBuilder {
}

export interface Role extends BaseEntity {
  name: string;
  authority: string;
  description: string;
  menus: Menu[];
}

export interface RoleBuilder {
}

export interface User extends BaseEntity, UserDetails {
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  roles: Role[];
  treeMenus: Menu[];
}

export interface UserBuilder {
}

export interface ApiResponse extends BaseResponse {
  data: any;
}

export interface ApiResponseBuilder<C, B> extends BaseResponseBuilder<C, B> {
}

export interface ApiResponseBuilderImpl extends ApiResponseBuilder<ApiResponse, ApiResponseBuilderImpl> {
}

export interface BaseResponse {
  status: number;
  message: string;
}

export interface BaseResponseBuilder<C, B> {
}

export interface BaseResponseBuilderImpl extends BaseResponseBuilder<BaseResponse, BaseResponseBuilderImpl> {
}

export interface SimpleOption {
  key: string;
  value: string;
}

export interface SimpleOptionBuilder {
}

export interface ValidationResponse extends BaseResponse {
  errors: { [index: string]: string };
}

export interface ValidationResponseBuilder<C, B> extends BaseResponseBuilder<C, B> {
}

export interface ValidationResponseBuilderImpl extends ValidationResponseBuilder<ValidationResponse, ValidationResponseBuilderImpl> {
}

export interface Page<T> extends Slice<T> {
  totalPages: number;
  totalElements: number;
}

export interface Serializable {
}

export interface GrantedAuthority extends Serializable {
  authority: string;
}

export interface UserDetails extends Serializable {
  enabled: boolean;
  password: string;
  username: string;
  authorities: GrantedAuthority[];
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}

export interface Sort extends Streamable<Order>, Serializable {
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageSize: number;
  unpaged: boolean;
  pageNumber: number;
}

export interface Slice<T> extends Streamable<T> {
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  pageable: Pageable;
  last: boolean;
}

export interface Streamable<T> extends Iterable<T>, Supplier<Stream<T>> {
  empty: boolean;
}

export interface Order extends Serializable {
  direction: Direction;
  property: string;
  ignoreCase: boolean;
  nullHandling: NullHandling;
  ascending: boolean;
  descending: boolean;
}

export interface Iterable<T> {
}

export interface Supplier<T> {
}

export interface Stream<T> extends BaseStream<T, Stream<T>> {
}

export interface BaseStream<T, S> extends AutoCloseable {
  parallel: boolean;
}

export interface AutoCloseable {
}

export type Direction = "ASC" | "DESC";

export type NullHandling = "NATIVE" | "NULLS_FIRST" | "NULLS_LAST";
