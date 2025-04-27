package mukodjman_backend.repository;

import jakarta.transaction.Transactional;
import mukodjman_backend.model.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    @Query("SELECT r.dreamId FROM Reaction r WHERE r.userId = :userId")
    List<Long> findDreamIdsByUserId(@Param("userId") Long userId);
    List<Reaction> findByUserId(Long id);

    List<Reaction> findByDreamId(Long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Reaction r WHERE r.userId = :userId AND r.dreamId = :dreamId")
    void removeLike(@Param("userId") Long userId, @Param("dreamId") Long dreamId);

}
