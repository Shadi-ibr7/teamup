import 'package:flutter/material.dart';

class SearchBarWidget extends StatelessWidget {
  final ValueChanged<String>? onChanged;
  const SearchBarWidget({super.key, this.onChanged});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Container(
        height: 48,
        decoration: ShapeDecoration(
          color: theme.colorScheme.surface,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        child: Row(
          children: [
            Padding(
              padding: const EdgeInsets.only(left: 16),
              child: Icon(
                Icons.search,
                color: theme.colorScheme.secondary,
                size: 24,
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: TextField(
                onChanged: onChanged,
                style: TextStyle(
                  color: theme.colorScheme.secondary,
                  fontSize: 16,
                  fontWeight: FontWeight.w400,
                  height: 1.50,
                ),
                cursorColor: theme.colorScheme.secondary,
                decoration: InputDecoration(
                  hintText: 'Search...',
                  hintStyle: TextStyle(
                    color: theme.colorScheme.secondary,
                    fontSize: 16,
                    fontWeight: FontWeight.w400,
                    height: 1.50,
                  ),
                  border: InputBorder.none,
                  isCollapsed: true,
                  contentPadding: EdgeInsets.zero,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
