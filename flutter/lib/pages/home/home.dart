import 'package:flutter/material.dart';
import 'package:team_up/pages/home/widget/header.dart';
import 'package:team_up/pages/home/widget/search.dart';
import 'package:team_up/pages/home/widget/sport_section.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final List<Map<String, String>> allEvents = [
    {
      'title': 'Match de Football',
      'location': 'Stade A',
      'sport': 'Football',
      'image': 'assets/images/foot.jpg'
    },
    {
      'title': 'Match de Basket',
      'location': 'Terrain X',
      'sport': 'Basket',
      'image': 'assets/images/basket.jpg'
    },
    {
      'title': 'Match de Tennis',
      'location': 'Court 1',
      'sport': 'Tennis',
      'image': 'assets/images/tennis.jpg'
    },
  ];

  String searchQuery = '';

  List<Map<String, String>> get filteredEvents {
    if (searchQuery.isEmpty) return allEvents;
    return allEvents.where((event) {
      final query = searchQuery.toLowerCase();
      return event['title']!.toLowerCase().contains(query)
          || event['location']!.toLowerCase().contains(query)
          || event['sport']!.toLowerCase().contains(query);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.colorScheme.surface,
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 60),
            const Header(),
            const SizedBox(height: 30),
            SearchBarWidget(
              onChanged: (value) {
                setState(() {
                  searchQuery = value;
                });
              },
            ),
            const SizedBox(height: 13),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  Container(
                    height: 32,
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    decoration: ShapeDecoration(
                      color: theme.colorScheme.surface,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          'Filters',
                          style: TextStyle(
                            color: theme.colorScheme.onSurface,
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            height: 1.50,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Icon(
                          Icons.filter_list,
                          color: theme.colorScheme.onSurface,
                          size: 20,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Container(
              width: double.infinity,
              height: 60,
              padding: const EdgeInsets.only(
                top: 20,
                left: 16,
                right: 16,
                bottom: 12,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: 358,
                    child: Text(
                      'Événements en cours',
                      style: TextStyle(
                        color: theme.colorScheme.onSurface,
                        fontSize: 22,
                        fontWeight: FontWeight.w700,
                        height: 1.27,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(
              height: 200,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: filteredEvents.length,
                itemBuilder: (context, index) {
                  final event = filteredEvents[index];
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
            Container(
              width: double.infinity,
              padding: const EdgeInsets.only(
                top: 20,
                left: 16,
                right: 16,
                bottom: 12,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: 358,
                    child: Text(
                      'Football',
                      style: TextStyle(
                        color: theme.colorScheme.onSurface,
                        fontSize: 22,
                        fontWeight: FontWeight.w700,
                        height: 1.27,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  _buildFootballCard('assets/images/foot1.jpg', '5v5 Match', 'Stadium A', theme),
                  const SizedBox(width: 12),
                  _buildFootballCard('assets/images/foot2.jpg', 'Friendly Game', 'Park B', theme),
                  const SizedBox(width: 12),
                  _buildFootballCard('assets/images/foot3.png', 'Training Session', 'Field C', theme),
                ],
              ),
            ),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 84,
                    height: 40,
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    clipBehavior: Clip.antiAlias,
                    decoration: ShapeDecoration(
                      color: theme.colorScheme.primary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Text(
                          'See All',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: theme.colorScheme.onPrimary,
                            fontSize: 14,
                            fontWeight: FontWeight.w700,
                            height: 1.50,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            // Affichage groupé par sport
            ..._groupedBySport(filteredEvents).entries.map((entry) =>
              SportSection(sport: entry.key, events: entry.value),
            ),
          ],
        ),
      ),
      bottomNavigationBar: NavigationBar(theme),
    );
  }

  Widget _buildFootballCard(String image, String title, String location, ThemeData theme) {
    return Container(
      width: 160,
      decoration: ShapeDecoration(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            height: 90,
            clipBehavior: Clip.antiAlias,
            decoration: ShapeDecoration(
              image: DecorationImage(
                image: AssetImage(image),
                fit: BoxFit.cover,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            title,
            style: TextStyle(
              color: theme.colorScheme.onSurface,
              fontSize: 16,
              fontWeight: FontWeight.w500,
              height: 1.50,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            location,
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
  }

  Widget NavigationBar(ThemeData theme) {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      backgroundColor: theme.brightness == Brightness.dark
          ? const Color(0xFF243847)
          : theme.colorScheme.surface,
      selectedItemColor: Colors.white,
      unselectedItemColor: theme.colorScheme.secondary,
      showSelectedLabels: false,
      showUnselectedLabels: false,
      items: const [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.calendar_today),
          label: '',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.add_box_outlined),
          label: '',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.chat_bubble_outline),
          label: '',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person_outline),
          label: '',
        ),
      ],
      currentIndex: 0,
      onTap: (index) {
        // Handle navigation
      },
    );
  }

  // Fonction utilitaire pour grouper les événements par sport
  Map<String, List<Map<String, String>>> _groupedBySport(List<Map<String, String>> events) {
    final Map<String, List<Map<String, String>>> grouped = {};
    for (final event in events) {
      final sport = event['sport'] ?? 'Autre';
      grouped.putIfAbsent(sport, () => []).add(event);
    }
    return grouped;
  }
}
