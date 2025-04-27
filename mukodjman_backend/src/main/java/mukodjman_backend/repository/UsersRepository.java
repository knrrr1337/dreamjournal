package mukodjman_backend.repository;

import mukodjman_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface UsersRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email); // Returns true if a user with the given email exists
    Optional<User> findByEmail(String email); // Optional return for fetching user

//    boolean existsByUsername(String username);
    boolean existsByUsernameAndPassword(String username, String password);
    User findByUsername(String username);

    @Query(value = "SELECT u.* FROM Users u JOIN Followers f ON u.id = f.followed_id WHERE f.follower_id = :userId", nativeQuery = true)
    List<User> findFollowedUsersByFollowerId(@Param("userId") Long userId);

}
