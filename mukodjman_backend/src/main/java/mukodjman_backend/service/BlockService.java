package mukodjman_backend.service;

import mukodjman_backend.repository.BlockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlockService {

    @Autowired
    private BlockRepository repository;

}
