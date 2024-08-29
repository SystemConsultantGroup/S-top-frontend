import { SubHeadNavbar } from "@/components/common/SubHeadNavbar/SubHeadNavbar";
import styles from "./write.module.css";
import { Banner } from "@/components/common/Banner/Banner";
import { Checkbox } from "@mantine/core";


const ProposalWritePage = () => {
  return (
    <div className={styles.backColor}>
      <div className={styles.container}>
        <SubHeadNavbar title="Info Desk" />
        <Banner
          type="IND_UNIV_PROJECT"
          title="산학협력 프로젝트"
          subtitle="Industry-Academia Collaboration Project"
          text="성균관대학교 소프트웨어융합대학과 기업들이 협약을 맺고, 기업이 필요로 하는 주제를 바탕으로 실무 중심의 프로젝트를 수행합니다."
        />
      </div>
      <h2 className={styles.word}>산학협력 과제 제안</h2>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" name="email" required/>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="website">웹사이트</label>
            <input type="url" id="website" name="website" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="projectName">프로젝트명</label>
            <input type="text" id="projectName" name="projectName" required />
          </div>
          <div className={styles.formGroup}>
            <label>프로젝트 분야</label>
            <div className={styles.checkboxGroup}>
              <Checkbox label="Label 1"/>
              <Checkbox label="Label 2"/>
              <Checkbox label="Label 3"/>
              <Checkbox label="Label 4"/>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="title">제목</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="summary">과제 요약</label>
            <textarea id="summary" name="summary" rows={3} required></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">과제 설명</label>
            <textarea id="description" name="description" rows={6} required></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="file1">첨부파일 1</label>
            <input type="file" id="file1" name="file1" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="file2">첨부파일 2</label>
            <input type="file" id="file2" name="file2" />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>제출하기</button>
            <button type="reset" className={styles.resetButton}>목록으로</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ProposalWritePage;
