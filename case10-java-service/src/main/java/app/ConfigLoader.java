package app;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Properties;

/** Loads service configuration; a missing or corrupt file must abort startup. */
public class ConfigLoader {
    /** Parses the config file, propagating read failures to the caller. */
    public Properties load(Path file) throws IOException {
        Properties props = new Properties();
        try (var reader = Files.newBufferedReader(file)) {
            props.load(reader);
        }
        if (!props.containsKey("auth.enabled")) {
            throw new IOException("config missing required key auth.enabled");
        }
        return props;
    }
}
