package mukodjman_backend.repository;

import jakarta.transaction.Transactional;
import mukodjman_backend.model.DreamImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DreamImageRepository extends JpaRepository<DreamImage, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM DreamImage d WHERE d.imageUrl = :imageUrl")
    void deleteByImageUrl(@Param("imageUrl") String imageUrl);

    List<DreamImage> findAllByDreamId(@Param("dreamId") Long dreamId);

}
