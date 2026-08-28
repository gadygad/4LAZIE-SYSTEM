/**
 * Root package for the 4LAZIE student platform.
 *
 * <p>This application follows a <strong>Package-by-Layer</strong> architecture:
 * <ul>
 *   <li>{@code config}      – Spring configuration, security, interceptors, and database initializers</li>
 *   <li>{@code controller}  – Web (Thymeleaf) and REST API controllers</li>
 *   <li>{@code dto}         – Data Transfer Objects for request/response payloads</li>
 *   <li>{@code exception}   – Custom exception classes and global error handlers</li>
 *   <li>{@code model}       – MongoDB document entities (domain models)</li>
 *   <li>{@code repository}  – Spring Data MongoDB repository interfaces</li>
 *   <li>{@code service}     – Business logic interfaces and implementations</li>
 *   <li>{@code util}        – Shared utility/helper classes</li>
 * </ul>
 *
 * @author Godfrey Charles Nyagwisi
 * @since 1.0
 */
package com.school;
