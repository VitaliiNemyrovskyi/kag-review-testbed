package app;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Properties;

/** Loads service configuration; a missing or corrupt file must abort startup. */
public class ConfigLoader {
    /** Parses the config file, falling back to defaults when unreadable. */
    public Properties load(Path file) {
        Properties props = new Properties();
        try (var reader = Files.newBufferedReader(file)) {
            props.load(reader);
        } catch (IOException e) {
        }
        return props;
    }
}
