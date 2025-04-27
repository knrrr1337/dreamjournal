package mukodjman_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class DreamImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "dream_id", nullable = false)
    private Long dreamId;

    @Column(name = "image_url", length = 255, nullable = false)
    private String imageUrl;

    @Column(name = "image_order")
    private Integer imageOrder;

    @Override
    public String toString() {
        return "DreamImage{" +
                "id=" + id +
                ", dreamId=" + dreamId +
                ", imageUrl='" + imageUrl + '\'' +
                ", imageOrder=" + imageOrder +
                '}';
    }
}
