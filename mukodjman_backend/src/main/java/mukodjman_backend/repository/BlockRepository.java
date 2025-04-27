package mukodjman_backend.repository;

import jakarta.persistence.Column;
import jakarta.transaction.Transactional;
import mukodjman_backend.model.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BlockRepository extends JpaRepository<Block, Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM Block b WHERE b.blocker.id = :userId AND b.blocked.id = :userToBeUnblockedId")
    void delete(@Param("userId") long userId, @Param("userToBeUnblockedId") long userToBeUnblockedId);



    @Query("SELECT b FROM Block b WHERE b.blocker.id = :userId")
    List<Block> findAllByBlockerId(@Param("userId") Long userId);
}
