import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import { useState } from 'react'

export default function Home({ photos }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function importAll(r) {
    return r.keys().map(r);
  }
  
  const images = importAll(require.context('../uploads/', false, /\.(png|jpe?g|svg)$/));

  console.log(images[0].default.src);

  console.log(photos);


  return (
    <div>
      {
        photos.map((photo, i) => {
          console.log(photo.categories)
          if(selectedCategory !== '') {
            if(photo.categories.find(categorie => categorie === selectedCategory)) {
              return (
                <div key={i}>
                  <h1>{photo.titre}</h1>
                  <p>{photo.description}</p>
                  <p>{photo.categories}</p>
                </div>
              )
            }
            console.log('aucune catégorie ne correspond !');
          } else {
            return (
              <div key={i}>
                <h1>{photo.titre}</h1>
                <p>{photo.description}</p>
                <p>{photo.categories}</p>
              </div>
            )
          }
        })
        }
    </div>
  )
}

export async function getStaticProps() {
  // List of files in blgos folder
  const filesInPhotos = fs.readdirSync('./photos')

  // Get the front matter and slug (the filename without .md) of all files
  const photos = filesInPhotos.map(filename => {
    const file = fs.readFileSync(`./photos/${filename}`, 'utf8')
    const matterData = matter(file)

    return {
      ...matterData.data, // matterData.data contains front matter
      slug: filename.slice(0, filename.indexOf('.'))
    }
  })

  return {
    props: {
      photos
    }
  }

}
