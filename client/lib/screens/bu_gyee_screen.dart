import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class BuGyeeScreen extends StatefulWidget {
  @override
  _BuGyeeScreenState createState() => _BuGyeeScreenState();
}

class _ShanKoneMeeScreenState extends State<BuGyeeScreen> {
  // Logic နှင့် Socket ပိုင်းသည် ရှမ်းကိုးမီးနှင့် ဆင်တူသော်လည်း 
  // ဖဲချပ်အရေအတွက် (၅) ချပ် ဖြစ်သွားပါမည်။
}

class _BuGyeeScreenState extends State<BuGyeeScreen> {
  late IO.Socket socket;
  List<dynamic> myCards = []; 
  String gameStatus = "ဘူကြီးပွဲ စတင်ရန် စောင့်ဆိုင်းနေသည်...";
  bool isRevealed = false;

  @override
  void initState() {
    super.initState();
    connectSocket();
  }

  void connectSocket() {
    // Server IP ကို ကိုယ့် Server IP နဲ့ လဲပေးပါ
    socket = IO.io('http://your-server-ip:3000', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });
    socket.connect();

    socket.on('deal_bugyee_cards', (data) {
      setState(() {
        myCards = data['cards']; // ဖဲ ၅ ချပ် ရမည်
        isRevealed = false;
        gameStatus = "ဖဲချပ်များ ရရှိပါပြီ။ စီပေးပါ...";
      });
    });
  }

  // ဖဲချပ် တစ်ချပ်ချင်းစီ၏ UI
  Widget _buildBuGyeeCard(String cardImage, int index) {
    return Transform.translate(
      offset: Offset(index * -30.0, 0), // ဖဲချပ်များကို တစ်ခုပေါ်တစ်ခု ထပ်ပြရန်
      child: Container(
        width: 80,
        height: 120,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 5)],
          image: DecorationImage(
            image: AssetImage(isRevealed ? 'assets/images/cards/$cardImage.png' : 'assets/images/ui/card_back.png'),
            fit: BoxFit.cover,
          ),
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
            image: AssetImage('assets/images/ui/bugyee_table.png'),
            fit: BoxFit.cover,
          ),
        ),
        child: Stack(
          children: [
            // အပေါ်ပိုင်း - ဂိမ်းအခြေအနေ
            Positioned(
              top: 60,
              left: 0,
              right: 0,
              child: Center(
                child: Container(
                  padding: EdgeInsets.all(10),
                  color: Colors.black45,
                  child: Text(gameStatus, style: TextStyle(color: Colors.white, fontSize: 18)),
                ),
              ),
            ),

            // အလယ်ပိုင်း - ကစားသူ၏ ဖဲ ၅ ချပ် (Fan Shape ပုံစံ)
            Center(
              child: Container(
                height: 200,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(myCards.length, (index) => _buildBuGyeeCard(myCards[index], index)),
                ),
              ),
            ),

            // အောက်ခြေ - ခလုတ်များ
            Positioned(
              bottom: 50,
              left: 0,
              right: 0,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _controlButton("ဖဲလှန်မည်", Colors.green, () {
                    setState(() { isRevealed = true; });
                  }),
                  _controlButton("နောက်တစ်ပွဲ", Colors.orange, () {
                    socket.emit('request_new_game');
                  }),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _controlButton(String text, Color color, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 40, vertical: 15),
        decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(30)),
        child: Text(text, style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
      ),
    );
  }
}
