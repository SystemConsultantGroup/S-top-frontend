import classes from "../galley.module.css";
import { SearchInput } from "@/components/common/SearchInput";
import { GalleryPreview } from "@/components/common/GalleryPreview/GalleryPreview";

const testimgurl = "https://i.ytimg.com/vi/h7SkjDKF11g/maxresdefault.jpg";

export default function AdminGalleryPage() {
  return (
    <>
      <div>
        <h1>갤러리 관리</h1>
      </div>
      <>
        <div className={classes.search}>
          <SearchInput></SearchInput>
        </div>
        <table className={classes.cards}>
          <tbody>
            <tr>
              <td>
                <GalleryPreview
                  imgUrl={testimgurl}
                  title={"멋진 제목"}
                  date={new Date()}
                  viewCount={1}
                />
              </td>
              <td>
                <GalleryPreview
                  imgUrl={testimgurl}
                  title={"멋진 제목"}
                  date={new Date()}
                  viewCount={0}
                />
              </td>
              <td>
                <GalleryPreview
                  imgUrl={testimgurl}
                  title={"멋진 제목"}
                  date={new Date()}
                  viewCount={0}
                />
              </td>
            </tr>
            <tr>
              <td>
                <GalleryPreview
                  imgUrl={testimgurl}
                  title={"멋진 제목"}
                  date={new Date()}
                  viewCount={1}
                />
              </td>
              <td>
                <GalleryPreview
                  imgUrl={testimgurl}
                  title={"멋진 제목"}
                  date={new Date()}
                  viewCount={0}
                />
              </td>
              <td>
                <GalleryPreview
                  imgUrl={testimgurl}
                  title={"멋진 제목"}
                  date={new Date()}
                  viewCount={0}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    </>
  );
}
