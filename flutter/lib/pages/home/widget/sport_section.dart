import 'package:flutter/material.dart';

class SportSection extends StatelessWidget {
  final String sport;
  final List<Map<String, String>> events;
  const SportSection({super.key, required this.sport, required this.events});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 16, top: 20, right: 16, bottom: 12),
          child: Text(
            sport,
            style: TextStyle(
              color: theme.colorScheme.onSurface,
              fontSize: 22,
              fontWeight: FontWeight.w700,
              height: 1.27,
            ),
          ),
        ),
        SizedBox(
          height: 200,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: events.length,
            itemBuilder: (context, index) {
              final event = events[index];
              return Container(
                width: 240,
                margin: const EdgeInsets.only(right: 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: double.infinity,
                      height: 135,
                      decoration: ShapeDecoration(
                        image: DecorationImage(
                          image: AssetImage(event['image']!),
                          fit: BoxFit.cover,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      event['title']!,
                      style: TextStyle(
                        color: theme.colorScheme.onSurface,
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                        height: 1.50,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      event['location']!,
                      style: TextStyle(
                        color: theme.colorScheme.secondary,
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                        height: 1.50,
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
} 