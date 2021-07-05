# Dictionary-and-Known-Password-Attack-tool-using-cpp

# Introduction

One of the most common means for authenticating people in computer systems is through the use of usernames and passwords. Ideally, passwords should be easy to remember and hard to guess. These two goals are in conflict with each other. An attempt to gain access to a computer system by using a very large set of words to generate potential passwords is known as dictionary attack

# Dictionary and Known Password Attack

A dictionary attack is a systematic method of guessing a password by trying many common words and their simple variations. The attackers use extensive lists of the most common passwords, popular pet names, fictional characters, or literally just words from a dictionary – hence the name of the attack. They also change some letters to numbers or special characters, like “password1”. A dictionary attack can be performed both online and offline.

In an online attack, the attacker repeatedly tries to log in or gain access like any other user. This type of attack works better if the hacker has a list of likely passwords. If the attack takes too long, it might get noticed by a system administrator or the original user.

In an offline attack, however, there are no network limitations to how many times you can guess the password. To do it, hackers need to get their hands on the password storage file from the system they want to access, so it’s more complicated than an online attack.

# Designing Dictionary Attack Tool

In this assignment, We will design a tool to perform online dictionary attack or known password attack on a web server. The design report for our attack tool is following.

- Our target is to design a tool to gain access to an website which restricts its access with basic HTTP framework for authentication. A simplified HTTP authentication works in two steps. a) A client wants to authentic itself with a POST request, b) Server responds to client with. authentication.

<img width="782" alt="Screenshot 2021-07-05 at 9 31 35 PM" src="https://user-images.githubusercontent.com/32927745/124494234-67dad080-ddd8-11eb-87d9-7c302b4ca647.png">



- HTTP is an application layer protocol. We design our packet header with username and password value in fields, the packet is shown in the following figure.

- Out tool will iterate over Dictionary.txt and for each word, it will sent a POST request. Upon receiving the positive response from the server, it will successfully terminates the attack.





Justification for Our Design 

While brute force attacks are best used for short and random passwords, dictionary attacks are better tools to crack longer passwords based on real words. Normal have a tendency to use meaningful words in their password followed by a few numerical character sequences. Also, we will use some common known passwords which are publicly available in internet. We will test our attack tool on a server created in local machine. We will not limit login attempts or two factor authentication in server during testing our tool. We will assume that the usernames are available to us.
 So, out attacking tool can send request as much as required for each user. If there are any user with a matched password from our dataset, our attacking tool will successfully access gain to the system. 
