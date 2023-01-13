# vizor README

## 설치

1. 하위 폴더를 포함하여 파일들을 내려받는다.
2. 터미널을 열고 다음과 같이 입력한다.
   ```
   C:\>code.cmd --install-extension vizor-0.0.1.vsix
   ```

<!-- ## TeX 파일 열기

1. `\include{foo}` 또는 `\input{foo}`에서 `foo`를 선택한다.
1. 명령 팔레트를 열고 `Vizor: Open TeX` 명령을 내리거나 **Alt+J**를 누른다. 
   확장자가 명시되어 있지 않아도, foo.tex 파일이 존재하면 열린다. 

다음은 또 다른 방법이다.

1. `\include{foo}` 또는 `\input{foo}`이 있는 줄에 커서를 놓는다.
1. 명령 팔레트를 열고 `Vizor: Open TeX` 명령을 내리거나 **Alt+J**를 누른다. 
   현재 줄에서 발견된 파일 이름들의 목록이 창 상단에 나타난다.
1. 파일 목록에서 하나를 선택한다. -->

## 이미지 파일 열기

LaTeX Workshop 확장 프로그램이, PDF 뷰어를 포함하고 있기 때문에, 사용되고 있다고 전제한다.

1. `\includegraphics{foo}`에서 `foo`를 선택한다. 
   <sub>(HzGuide 클래스의 `\image` 같은 이미지 삽입 명령들도 대상이 될 수 있다.)</sub>
1. 명령 팔레트를 열고 `Vizor: Open Image` 명령을 내리거나 **Alt+V**를 누른다.

`vizor.imagePath` 설정 옵션에 지정된 경로들에서 차례로 파일을 찾고, 발견되면 열린다.
확장자가 명시되어 있지 않으면 `vizor.imageType` 설정 옵션에 지정된 확장자들을 적용하여 파일들을 찾는다. 이를테면 foo.png, foo.pdf, foo.jpg를 차례로 찾는다.


다음은 또 다른 방법이다.

1. `\includegraphics{foo}`이 있는 줄에 커서를 놓는다.
1. 명령 팔레트를 열고 `Vizor: Open Image` 명령을 내리거나 **Alt+V**를 누른다.
   현재 줄에서 발견된 파일 이름들의 목록이 창 상단에 나타난다.
1. 파일 목록에서 하나를 선택한다.
