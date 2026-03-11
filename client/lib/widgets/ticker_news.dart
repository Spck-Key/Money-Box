import 'package:flutter/material.dart';
import 'package:marquee/marquee.dart';

class TickerNews extends StatelessWidget {
  final String message;
  final bool isVisible;

  TickerNews({required this.message, this.isVisible = true});

  @override
  Widget build(BuildContext context) {
    if (!isVisible) return SizedBox.shrink();

    return Container(
      height: 30,
      color: Colors.black.withOpacity(0.6),
      child: Marquee(
        text: message, // ဥပမာ - "ဒိုင်ကစားသူ သုရကျော်မှ ၁သိန်း နိုင်သွားပါသည်"
        style: TextStyle(color: Colors.yellow, fontWeight: FontWeight.bold),
        scrollAxis: Axis.horizontal,
        blankSpace: 20.0,
        velocity: 50.0, // စာသားပြေးနှုန်း
        pauseAfterRound: Duration(seconds: 1),
        accelerationDuration: Duration(seconds: 1),
        accelerationCurve: Curves.linear,
      ),
    );
  }
}
