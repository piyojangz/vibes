import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faGear, faCamera, faHeart, faBookmark, faUser, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Tab3() {
  // ข้อมูลโปรไฟล์จำลอง (ในโปรเจคจริงอาจมาจาก API หรือ state)
  const profileData = {
    name: "สมชาย ใจดี",
    username: "@somchai_j",
    bio: "ชอบเที่ยว ชอบกิน ชอบเต้น | มอเตอร์ไซค์คือชีวิต | คนธรรมดาที่มีความฝัน",
    location: "กรุงเทพฯ, ประเทศไทย",
    website: "instagram.com/somchai_j",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    coverPhoto: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1000",
    posts: 128,
    followers: 2453,
    following: 342,
    memberSince: "ธันวาคม 2023",
    photos: [
      "https://img.wongnai.com/p/1600x0/2023/05/10/69810082a5a74ff89bd59e8ede28fb87.jpg",
      "https://img.wongnai.com/p/1600x0/2021/08/25/3c0e65e16210445abc27eb6a90bf7771.jpg",
      "https://img.wongnai.com/p/1600x0/2021/07/10/ff1cd09c47be475bb2a4a8ee52bdd5cd.jpg",
      "https://img.wongnai.com/p/1600x0/2019/11/19/4e72339a7a714e31b33c5c2dbbe87281.jpg",
      "https://img.wongnai.com/p/1600x0/2020/07/24/7184fe17f4a14b2586c7b33bc422bc40.jpg",
      "https://img.wongnai.com/p/1600x0/2022/05/30/b4bcf1b3cbb0403ba3be14b6c8717d8f.jpg",
    ]
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cover Photo with Edit Button */}
      <ImageBackground
        source={{ uri: profileData.coverPhoto }}
        style={styles.coverPhoto}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.coverGradient}
        />
        <TouchableOpacity style={styles.coverEditButton}>
          <FontAwesomeIcon icon={faCamera} size={14} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      {/* Profile Info Section */}
      <View style={styles.profileContainer}>
        {/* Avatar and Action Buttons */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: profileData.avatar }}
              style={styles.avatar}
              contentFit="cover"
              transition={300}
            />
            <TouchableOpacity style={styles.avatarEditButton}>
              <FontAwesomeIcon icon={faCamera} size={12} color="#fff" />
            </TouchableOpacity>
          </View>

          <HStack space="sm">
            <Button
              style={styles.editButton}
              variant="outline"
              size="sm"
            >
              <HStack style={{ alignItems: 'center' }} space="xs">
                <FontAwesomeIcon icon={faEdit} size={14} color="#01363E" />
                <Text style={{ color: '#01363E', fontSize: 12, fontFamily: 'KanitLight' }}>แก้ไขโปรไฟล์</Text>
              </HStack>
            </Button>
            <Button
              style={styles.settingsButton}
              variant="outline"
              size="sm"
            >
              <FontAwesomeIcon icon={faGear} size={16} color="#01363E" />
            </Button>
          </HStack>
        </View>

 

        {/* Stats Bar */}
        <HStack style={styles.statsContainer}>
          <VStack style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData.posts}</Text>
            <Text style={styles.statLabel}>โพสต์</Text>
          </VStack>
          <Divider orientation="vertical" style={{ height: '70%' }} />
          <VStack style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData.followers}</Text>
            <Text style={styles.statLabel}>ผู้ติดตาม</Text>
          </VStack>
          <Divider orientation="vertical" style={{ height: '70%' }} />
          <VStack style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData.following}</Text>
            <Text style={styles.statLabel}>กำลังติดตาม</Text>
          </VStack>
        </HStack>

        {/* Tab Navigation */}
        <HStack style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <FontAwesomeIcon icon={faUser} size={18} color="#01363E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <FontAwesomeIcon icon={faHeart} size={18} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <FontAwesomeIcon icon={faBookmark} size={18} color="#999" />
          </TouchableOpacity>
        </HStack>

        {/* Photo Grid */}
        <View style={styles.photoGrid}>
          {profileData.photos.map((photo, index) => (
            <TouchableOpacity key={index} style={styles.photoItem}>
              <Image
                source={{ uri: photo }}
                style={styles.photo}
                contentFit="cover"
                transition={300}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverPhoto: {
    height: 180,
    position: 'relative',
  },
  coverGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
  },
  coverEditButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: -40,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatarEditButton: {
    position: 'absolute',
    right: 3,
    bottom: 3,
    backgroundColor: '#01363E',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  editButton: {
    borderColor: '#ddd',
    borderRadius: 20,
    minWidth: 120,
  },
  settingsButton: {
    borderColor: '#ddd',
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontFamily: 'KanitMedium',
    color: '#01363E',
  },
  username: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'KanitLight',
    marginTop: -4,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    fontFamily: 'KanitLight',
    marginTop: 4,
  },
  locationContainer: {
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'KanitLight',
  },
  statsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'KanitMedium',
    color: '#01363E',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'KanitLight',
    marginTop: 2,
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#01363E',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  photoItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 4,
  },
  photo: {
    flex: 1,
    borderRadius: 8,
  }
});