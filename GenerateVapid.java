import nl.martijndwars.webpush.Utils;
import java.security.KeyPair;
import java.util.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import java.security.Security;
import java.security.interfaces.ECPublicKey;
import java.security.interfaces.ECPrivateKey;

public class GenerateVapid {
    public static void main(String[] args) throws Exception {
        Security.addProvider(new BouncyCastleProvider());
        KeyPair keyPair = Utils.generateVapidKeyPair();
        
        ECPublicKey publicKey = (ECPublicKey) keyPair.getPublic();
        ECPrivateKey privateKey = (ECPrivateKey) keyPair.getPrivate();
        
        byte[] encodedPublicKey = Utils.encode(publicKey);
        byte[] encodedPrivateKey = Utils.encode(privateKey);
        
        System.out.println("Public: " + Base64.getUrlEncoder().withoutPadding().encodeToString(encodedPublicKey));
        System.out.println("Private: " + Base64.getUrlEncoder().withoutPadding().encodeToString(encodedPrivateKey));
    }
}
