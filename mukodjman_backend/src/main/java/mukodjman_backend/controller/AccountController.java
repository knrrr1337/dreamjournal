//package mukodjman_backend.controller;
//
//import io.swagger.v3.oas.annotations.tags.Tag;
//import mukodjman_backend.dto.Register.RegisterRequest;
//import org.springframework.web.bind.annotation.*;
//import mukodjman_backend.dto.Login.LoginRequest;
//
//@RestController
//@RequestMapping("account/")
//@Tag(name="felhasznalok", description="felhasznalok kontrollere")
//public class AccountController {
//
//    @PostMapping("login")
//    public LoginRequest bismillah(@RequestBody LoginRequest loginRequest) {
//        System.out.println(loginRequest.getUsername() + " " + loginRequest.getPassword());
//        return loginRequest;
//    }
//
//    @PostMapping("/register")
//    public RegisterRequest alhamdulillah(@RequestBody RegisterRequest registerRequest) {
//        System.out.println(registerRequest.getUsername() + " " + registerRequest.getPassword());
//        return registerRequest;
//    }
//
//    @GetMapping("he")
//    public String rhak() {
//        System.out.println("he");
//        return "he";
//    }
//
//
//}



package mukodjman_backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import mukodjman_backend.Handler.MyWebSocketHandler;
import mukodjman_backend.dto.Login.LoginRequest;
import mukodjman_backend.dto.Register.RegisterRequest;
import mukodjman_backend.model.Block;
import mukodjman_backend.model.Dream;
import mukodjman_backend.model.Reaction;
import mukodjman_backend.model.User;
import mukodjman_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("account/")
@Tag(name="account", description="csin account")
public class AccountController {


    private final String uploadDir = "uploads/";
    @Autowired
    private UserService userService;

    @PostMapping("login")
    public User bismillah(@RequestBody LoginRequest loginRequest) {
        User response = userService.loginUser(loginRequest);
        System.out.println(response);
        return response;
    }

    @PostMapping("register")
    public String alhamdulillah(
            @RequestPart("email") String email,
            @RequestPart("username") String username,
            @RequestPart("password") String password,
            @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture
    ) {
        try {
            String fileName = null;
            if (profilePicture != null && !profilePicture.isEmpty()) {
                fileName = saveFile(profilePicture);
            }

            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(password);
            newUser.setEmail(email);
            if (fileName != null) {
                newUser.setProfilePicture(fileName);
            } else {
                newUser.setProfilePicture("default");
            }
            newUser.setBio("No bio given.");
            LocalDateTime now = LocalDateTime.now();
            newUser.setCreated_at(now);
            List<Block> blocks = new ArrayList<>();
            List<Reaction> reactions = new ArrayList<>();
            List<Dream> dreams = new ArrayList<>();
            newUser.setDreams(dreams);
            newUser.setBlockedUsers(blocks);
            newUser.setReactions(reactions);
            String response = userService.createUser(newUser);

            return response;
        } catch (IOException e) {
            return "Error saving file: " + e.getMessage();
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (!Files.exists(Paths.get(uploadDir))) {
            Files.createDirectories(Paths.get(uploadDir));
        }

        String fileExtension = getFileExtension(file.getOriginalFilename());
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;
        Path filePath = Paths.get(uploadDir + uniqueFileName);
        Files.write(filePath, file.getBytes());

        return uniqueFileName;
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    @GetMapping("he")
    public String rhak() {
        System.out.println("he");
        return "he";
    }
}