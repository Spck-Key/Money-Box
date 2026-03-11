import 'package:flutter/material.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(MoneyBedApp());
}

class MoneyBedApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MoneyBed 3D',
      theme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.red,
      ),
      home: LoginScreen(), // အရင်ဆုံး Login ဝင်ခိုင်းမည်
    );
  }
}
