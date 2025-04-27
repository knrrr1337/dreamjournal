package mukodjman_backend.dto.Register;

import org.springframework.web.multipart.MultipartFile;

public class RegisterRequest {

    private String email;
    private String username;
    private String password;
    private String profilePictureUrl;

    // Getters and setters


    public RegisterRequest(String email, String username, String password, String profilePictureUrl) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.profilePictureUrl = profilePictureUrl;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getProfilePicture() {
        return profilePictureUrl;
    }
}