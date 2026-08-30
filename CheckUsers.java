import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import com.mongodb.client.MongoCursor;

public class CheckUsers {
    public static void main(String[] args) {
        try (MongoClient mongoClient = MongoClients.create("mongodb+srv://4lazie:4LAZIE%40%402024@school-system.zdkwg3h.mongodb.net/school_system_db?retryWrites=true&w=majority")) {
            MongoDatabase database = mongoClient.getDatabase("school_system_db");
            MongoCollection<Document> collection = database.getCollection("users");
            MongoCursor<Document> cursor = collection.find(new Document("role", "SUPER_ADMIN")).iterator();
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                System.out.println("SUPER ADMIN: " + doc.getString("email") + " - " + doc.getString("name"));
            }
        }
    }
}
