import { useEffect, useState } from "react";
import JobList from "../components/JobList";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDocs, setDoc, collection } from "@firebase/firestore";
import { db } from "../components/firebase/firebase";
function Home() {
  const [isLoading, setIsLoading] = useState();
  const [loadedJobs, setLoadedJobs] = useState([]);

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const getAllDocuments = async () => {
      setIsLoading(true);
      const documents = [];
      const querySnapshot = await getDocs(collection(db, "jobs"));
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      setDocuments(documents);
      setLoadedJobs(documents);
      setIsLoading(false);
    };
    getAllDocuments();
  }, []);

  return (
    <>
      {isLoading && (<div style={{ textAlign: "center" }}>LOADING...</div>)}
      {!isLoading && loadedJobs.length === 0 && (
        <div style={{ textAlign: "center" }}>NO LOADED JOBS</div>
      )}
      {!isLoading && loadedJobs.length > 0 && (
        <div>
          <JobList jobs={loadedJobs} edit={false}/>
        </div>
      )}
    </>
  );
}

export default Home;
