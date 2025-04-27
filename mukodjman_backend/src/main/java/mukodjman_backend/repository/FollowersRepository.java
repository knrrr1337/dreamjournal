package mukodjman_backend.repository;

import jakarta.transaction.Transactional;
import mukodjman_backend.model.Followers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowersRepository extends JpaRepository<Followers, Integer> {
    List<Followers> findAllByFollowerId(Long userId);

    @Query("SELECT f FROM Followers f WHERE f.followed.id = :userId")
    List<Followers> findAllFollowersByUserId(@Param("userId") Long userId);


//    @Query("SELECT Followers f WHERE f.Follower.id = :followerId AND f.followed.id = :followedId")
//    void follow(@Param("followerId") long followerId, @Param("followedId") long followedId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Followers f WHERE f.follower.id = :followerId AND f.followed.id = :followedId")
    void unfollow(@Param("followerId") long followerId, @Param("followedId") long followedId);
}
