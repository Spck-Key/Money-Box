import 'package:flutter/material.dart';
import 'owner_dashboard.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController idController = TextEditingController();
  final String ownerKey = "THURAKYAW16.10.2026"; // ပိုင်ရှင် ID

  void checkLogin() {
    if (idController.text == ownerKey) {
      Navigator.push(context, MaterialPageRoute(builder: (context) => OwnerDashboard()));
    } else {
      // ဒီနေရာတွင် Player Login API ချိတ်ဆက်ရန်
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("ID မှားယွင်းနေသည်")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("MoneyBed 3D Login", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            Padding(
              padding: EdgeInsets.all(20),
              child: TextField(controller: idController, decoration: InputDecoration(border: OutlineInputBorder(), labelText: "Enter ID")),
            ),
            ElevatedButton(onPressed: checkLogin, child: Text("Login"))
          ],
        ),
      ),
    );
  }
}
