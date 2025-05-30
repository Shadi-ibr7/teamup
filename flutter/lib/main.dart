import 'package:flutter/material.dart';
import 'package:team_up/pages/home/home.dart';
import 'package:adaptive_theme/adaptive_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final savedThemeMode = await AdaptiveTheme.getThemeMode();
  runApp(MyApp(savedThemeMode: savedThemeMode));
}

class MyApp extends StatelessWidget {
  final AdaptiveThemeMode? savedThemeMode;

  const MyApp({super.key, this.savedThemeMode});

  @override
  Widget build(BuildContext context) {
    return AdaptiveTheme(
      light: ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        colorScheme: ColorScheme.light(
          primary: const Color(0xFF233847),
          secondary: const Color(0xFF91AFC9),
          surface: Colors.white,
        ),
      ),
      dark: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorScheme: ColorScheme.dark(
          primary: const Color(0xFF233847),
          secondary: const Color(0xFF91AFC9),
          surface: const Color(0xFF233847),
        ),
      ),
      initial: savedThemeMode ?? AdaptiveThemeMode.light,
      builder: (theme, darkTheme) => MaterialApp(
        title: 'TeamUp!',
        debugShowCheckedModeBanner: false,
        theme: theme,
        darkTheme: darkTheme,
        home: HomePage(),
      ),
    );
  }
}