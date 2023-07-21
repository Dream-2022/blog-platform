package tool;

public class ObtainUsername {
    public static String obtainUsername(){
        SnowflakeIdGenerator idGenerator = new SnowflakeIdGenerator(1, 1);
        long id = idGenerator.nextId();
        String username = String.format("%011d", id % 100000000000L);
        return username;
    }
}
