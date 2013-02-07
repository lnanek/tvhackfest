package tvhackfest.likeplause;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class ViewWebContentActivity extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);  
        super.init();     
                
        super.loadUrl("file:///android_asset/www/index.html");
    }
    
}
