import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'dart:math';

class ShanKoneMeeScreen extends StatefulWidget {
  @override
  _ShanKoneMeeScreenState createState() => _ShanKoneMeeScreenState();
}

class _ShanKoneMeeScreenState extends State<ShanKoneMeeScreen> with TickerProviderStateMixin {
  late IO.Socket socket;
  List<dynamic> myCards = []; // ငါ့ဖဲများ
  List<dynamic> dealerCards = []; // ဒိုင်ဖဲများ
  bool isDealing = false; // ဖဲဝေနေသလား
  String gameStatus = "လောင်းကြေးထပ်ရန် စောင့်ဆိုင်းနေသည်...";

  @override
  void initState() {
    super.initState();
    connectSocket();
  }

  // --- ၁။ Server နှင့် Socket ချိတ်ဆက်ခြင်း ---
  void connectSocket() {
    socket = IO.io('http://your-server-ip:3000', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });
    socket.connect();

    // Server မှ ဖဲဝေလိုက်သည့်ဒေတာကို လက်ခံခြင်း
    socket.on('deal_cards', (data) {
      setState(() {
        isDealing = true;
        myCards = data['player_cards'];
        dealerCards = data['dealer_cards'];
        gameStatus = "ဖဲဝေနေပါသည်...";
      });

      // ၃ စက္ကန့်အကြာတွင် ဖဲလှန်မည်
      Future.delayed(Duration(seconds: 3), () {
        setState(() {
          isDealing = false;
          gameStatus = "ပွဲပြီးဆုံးပါပြီ";
        });
      });
    });
  }

  // --- ၂။ ဖဲချပ် Widget (Animation ပါဝင်သည်) ---
  Widget _buildCard(String cardImage, bool isBack) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 500),
      margin: EdgeInsets.symmetric(horizontal: 5),
      width: 70,
      height: 100,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        image: DecorationImage(
          image: AssetImage(isBack ? 'assets/images/ui/card_back.png' : 'assets/images/cards/$cardImage.png'),
          fit: BoxFit.cover,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/ui/table.png'), // ကစားဝိုင်းနောက်ခံ
            fit: BoxFit.cover,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            // --- ဒိုင်နေရာ (Dealer Section) ---
            Column(
              children: [
                SizedBox(height: 50),
                CircleAvatar(radius: 30, backgroundImage: AssetImage('assets/images/ui/owner_avatar.png')),
                Text("ဒိုင် (Dealer)", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: dealerCards.isEmpty 
                    ? [SizedBox(height: 100)] 
                    : dealerCards.map((card) => _buildCard(card, isDealing)).toList(),
                ),
              ],
            ),

            // --- ဂိမ်းအခြေအနေပြစာတန်း ---
            Container(
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 5),
              color: Colors.black54,
              child: Text(gameStatus, style: TextStyle(color: Colors.yellow, fontSize: 18)),
            ),

            // --- ကစားသူနေရာ (Player Section) ---
            Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: myCards.isEmpty 
                    ? [SizedBox(height: 100)] 
                    : myCards.map((card) => _buildCard(card, isDealing)).toList(),
                ),
                SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _gameButton("ဖဲဆွဲမည်", Colors.blue, () {
                      socket.emit('draw_card');
                    }),
                    SizedBox(width: 20),
                    _gameButton("ရပ်မည်", Colors.red, () {
                      socket.emit('stand');
                    }),
                  ],
                ),
                SizedBox(height: 40),
              ],
            ),
          ],
        ),
      ),
    );
  }

  // --- ၃။ ဂိမ်းခလုတ်ပုံစံ ---
  Widget _gameButton(String label, Color color, VoidCallback onPressed) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: color,
        padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      ),
      child: Text(label, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
    );
  }

  @override
  void dispose() {
    socket.dispose();
    super.dispose();
  }
}
