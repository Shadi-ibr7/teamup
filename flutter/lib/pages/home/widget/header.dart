import 'package:flutter/material.dart';
import 'package:adaptive_theme/adaptive_theme.dart';

class Header extends StatelessWidget {
  const Header({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'TeamUp!',
          style: TextStyle(
            color: theme.colorScheme.onSurface,
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(width: 12),
        IconButton(
          onPressed: () {
            AdaptiveTheme.of(context).toggleThemeMode();
          },
          icon: Icon(
            theme.brightness == Brightness.dark
                ? Icons.light_mode
                : Icons.dark_mode,
            color: theme.colorScheme.onSurface,
          ),
        ),
      ],
    );
  }
}