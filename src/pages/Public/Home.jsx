import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus, faSignOutAlt, faBars, faSort } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/pages/Home.module.css";

const samplePosts = [
  {
    id: 1,
    image: "https://picsum.photos/200/300",
    category: "Garbage",
    title: "Garbage Pileup in Sector 5",
    description: "Garbage has not been collected for over a week.",
    location: "Sector 5, City",
    status: "Pending",
    reports: 5,
  },
  {
    id: 2,
    image: "https://picsum.photos/400/300",
    category: "Roads",
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues.",
    location: "Main Street, City",
    status: "In Progress",
    reports: 12,
  },
  {
    id: 3,
    image: "https://picsum.photos/600/300",
    category: "Streetlights",
    title: "Streetlight Not Working",
    description: "Streetlight has been out for 3 days.",
    location: "Park Avenue, City",
    status: "Resolved",
    reports: 3,
  },
];

export default function PublicHome() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isFilterOpen, setIsFilterOpen] = useState(false); 
  const [isSortOpen, setIsSortOpen] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [selectedStatus, setSelectedStatus] = useState("All"); 
  const [sortBy, setSortBy] = useState(null); 
  const [posts, setPosts] = useState(samplePosts); 

  const filteredPosts = posts.filter((post) => {
    const categoryMatch = selectedCategory === "All" || post.category === selectedCategory;
    const statusMatch = selectedStatus === "All" || post.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  let sortedPosts = [...filteredPosts];
  if (sortBy === "status") {
    sortedPosts.sort((a, b) => a.status.localeCompare(b.status));
  } else if (sortBy === "reportsLowToHigh") {
    sortedPosts.sort((a, b) => a.reports - b.reports);
  } else if (sortBy === "reportsHighToLow") {
    sortedPosts.sort((a, b) => b.reports - a.reports);
  }

  const handlePostClick = (postId) => {
    navigate(`/GrievanceDetail/${postId}`);
  };

  const handleCreatePost = () => {
    navigate("/public/create-grievance");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSortClick = () => {
    setIsSortOpen(!isSortOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setIsStatusFilterOpen(false);
  };

  const handleSortSelect = (sortType) => {
    setSortBy(sortType === sortBy ? null : sortType); 
    setIsSortOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
        <button
          className={styles.toggleSidebarButton}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "◄" : <FontAwesomeIcon icon={faBars} />}
        </button>

        {isSidebarOpen && (
          <div className={styles.filterSection}>
            <button className={styles.filterButton} onClick={handleFilterClick}>
              <FontAwesomeIcon icon={faFilter} /> Filter by Grievance
            </button>
            {isFilterOpen && (
              <div className={styles.filterOptions}>
                <button
                  className={`${styles.filterOption} ${selectedCategory === "All" ? styles.active : ""}`}
                  onClick={() => handleCategorySelect("All")}
                >
                  All
                </button>
                <button
                  className={`${styles.filterOption} ${selectedCategory === "Garbage" ? styles.active : ""}`}
                  onClick={() => handleCategorySelect("Garbage")}
                >
                  Garbage
                </button>
                <button
                  className={`${styles.filterOption} ${selectedCategory === "Roads" ? styles.active : ""}`}
                  onClick={() => handleCategorySelect("Roads")}
                >
                  Roads
                </button>
                <button
                  className={`${styles.filterOption} ${selectedCategory === "Streetlights" ? styles.active : ""}`}
                  onClick={() => handleCategorySelect("Streetlights")}
                >
                  Streetlights
                </button>
                <button
                  className={`${styles.filterOption} ${selectedCategory === "Water" ? styles.active : ""}`}
                  onClick={() => handleCategorySelect("Water")}
                >
                  Water
                </button>
                <button
                  className={`${styles.filterOption} ${selectedCategory === "Sewage" ? styles.active : ""}`}
                  onClick={() => handleCategorySelect("Sewage")}
                >
                  Sewage
                </button>
              </div>
            )}

            <button className={styles.sortButton} onClick={handleSortClick}>
              <FontAwesomeIcon icon={faSort} /> Sort
            </button>
            {isSortOpen && (
              <div className={styles.sortOptions}>
                <button
                  className={`${styles.sortOption} ${sortBy === "status" ? styles.active : ""}`}
                  onClick={() => handleSortSelect("status")}
                >
                  Sort by Status
                </button>
                <button
                  className={`${styles.sortOption} ${sortBy === "reportsLowToHigh" ? styles.active : ""}`}
                  onClick={() => handleSortSelect("reportsLowToHigh")}
                >
                  Sort by Reports (Low to High)
                </button>
                <button
                  className={`${styles.sortOption} ${sortBy === "reportsHighToLow" ? styles.active : ""}`}
                  onClick={() => handleSortSelect("reportsHighToLow")}
                >
                  Sort by Reports (High to Low)
                </button>
              </div>
            )}
          </div>
        )}

        {isSidebarOpen && (
          <button className={styles.createPostButton} onClick={handleCreatePost}>
            <FontAwesomeIcon icon={faPlus} /> Create Post
          </button>
        )}

        <button className={styles.logoutButton} onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> {isSidebarOpen && "Logout"}
        </button>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.postsGrid}>
          {sortedPosts.map((post) => (
            <div
              key={post.id}
              className={styles.postCard}
              onClick={() => handlePostClick(post.id)}
            >
              <img src={post.image} alt={post.title} className={styles.postImage} />
              <div className={styles.postDetails}>
                <span className={styles.postCategory}>{post.category}</span>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postDescription}>{post.description}</p>
                <p className={styles.postLocation}>Location: {post.location}</p>
                <p className={styles.postStatus}>Status: {post.status}</p>
                <p className={styles.postReports}>Reports: {post.reports}</p> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}