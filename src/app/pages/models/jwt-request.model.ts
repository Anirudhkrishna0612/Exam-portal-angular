    // src/app/models/jwt-request.model.ts

    /**
     * Interface representing the structure of the JWT authentication request.
     * This matches the JwtRequest DTO on your Spring Boot backend.
     */
    export interface JwtRequest {
      username: string;
      password?: string;
    }
    