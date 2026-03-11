import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class OwnerDashboard extends StatefulWidget {
  @override
  _OwnerDashboardState createState() => _OwnerDashboardState();
}

class _OwnerDashboardState extends State<OwnerDashboard> {
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController amountController = TextEditingController();
  final TextEditingController nameController = TextEditingController();
  String generatedID = "";

  Future<void> apiAction(String url, Map data) async {
    final response = await http.post(Uri.parse('http://your-server-ip:3000/admin/$url'), body: data);
    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("အောင်မြင်ပါသည်")));
      if (url == 'create-account') {
        setState(() { generatedID = jsonDecode(response.body)['id']; });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("ပိုင်ရှင်နေရာ (Admin)"), backgroundColor: Colors.red),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: Column(
            children: [
              Text("ယူနစ် ဖြည့်/နှုတ်", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              TextField(controller: phoneController, decoration: InputDecoration(labelText: "ဖုန်း/ID")),
              TextField(controller: amountController, decoration: InputDecoration(labelText: "ပမာဏ")),
              Row(
                children: [
                  ElevatedButton(onPressed: () => apiAction('manage-unit', {'phone': phoneController.text, 'amount': amountController.text, 'action': 'add'}), child: Text("ဖြည့်မည်")),
                  SizedBox(width: 10),
                  ElevatedButton(onPressed: () => apiAction('manage-unit', {'phone': phoneController.text, 'amount': amountController.text, 'action': 'withdraw'}), child: Text("နှုတ်မည်")),
                ],
              ),
              Divider(height: 40),
              Text("အကောင့်သစ်ဖွင့်ပေးရန်", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              TextField(controller: nameController, decoration: InputDecoration(labelText: "နာမည်")),
              ElevatedButton(onPressed: () => apiAction('create-account', {'name': nameController.text, 'phone': phoneController.text}), child: Text("အကောင့်ဖွင့်မည်")),
              if (generatedID.isNotEmpty) Text("Generated ID: $generatedID", style: TextStyle(color: Colors.blue, fontSize: 18)),
            ],
          ),
        ),
      ),
    );
  }
}
