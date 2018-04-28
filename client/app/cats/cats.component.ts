import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CatService } from '../services/cat.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Cat } from '../shared/models/cat.model';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {

  cat = new Cat();
  cats: Cat[] = [];
  uploadedFiles: any[] = [];
  isLoading = true;
  isEditing = false;
  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  filePath = './../../assets/images/upload';


  constructor(private catService: CatService,
    private formBuilder: FormBuilder, private el: ElementRef,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getCats();

    this.addCatForm = this.formBuilder.group({
      name: this.name,
      quantity: this.quantity,
      price: this.price,
      description: this.description
    });
  }

  getCats() {
    this.catService.getCats().subscribe(
      data => this.cats = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  fileUpload(event) {
   let response = JSON.parse(event.xhr.response);
   this.cat.files = response.data;
   console.log(this.cat.files);
  }

  public removeFile(iter) {
    // this.savedFile.splice(iter, 1);
  }

  addCat(edit) {
    if (edit) {
      debugger;
      this.catService.addCat(this.cat).subscribe(
        res => {
          this.cats.push(res);
          this.addCatForm.reset();
          this.toast.setMessage('item added successfully.', 'success');
        },
        error => console.log(error)
      );
    } else {
      this.catService.editCat(this.cat).subscribe(
        () => {
          this.isEditing = false;
          this.addCatForm.reset();
          this.getCats();
          this.toast.setMessage('item edited successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }



  enableEditing(cat: Cat) {
    console.log("Cat" + JSON.stringify(cat));
    this.isEditing = true;
    this.cat = Object.assign({}, cat);
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = new Cat();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getCats();
  }

  deleteCat(cat: Cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.catService.deleteCat(cat).subscribe(
        () => {
          const pos = this.cats.map(elem => elem._id).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
