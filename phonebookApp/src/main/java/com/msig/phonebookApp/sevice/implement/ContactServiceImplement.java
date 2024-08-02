package com.msig.phonebookApp.sevice.implement;

import com.msig.phonebookApp.dto.request.SearchContactRequest;
import com.msig.phonebookApp.entity.Contact;
import com.msig.phonebookApp.repository.ContactRepository;
import com.msig.phonebookApp.sevice.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContactServiceImplement implements ContactService {
    @Autowired
    private ContactRepository contactRepository;
    public ContactServiceImplement(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public Contact addContact(Contact contact) {
        try {
            Contact saved = contactRepository.save(contact);
            return saved;
        }catch (DataIntegrityViolationException e){
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Contact data already exists");
        }
    }

    @Override
    public List<Contact> getContactsByName(String name) {
        return findByNameOrThrowNotFound(name);
    }

    @Override
    public List<Contact> getAllContacts() {
        return contactRepository.findAll(Sort.by("name").ascending());
/*        boolean isValidSortField = false;
        for (Field declaredField : Contact.class.getDeclaredFields()) {
            if(!declaredField.getName().equals(request.getSortBy())) {
                //request.setSortBy("name");
                isValidSortField = true;
                break;
            }
        }
        if(!isValidSortField) {
            request.setSortBy("name");
        }
        Sort.Direction direction = Sort.Direction.fromString(request.getDirection());
        Sort sort = Sort.by(
                direction,
                request.getSortBy());
        return (Page<Contact>) contactRepository.findAll(sort);*/
    }

    @Override
    public Contact updateContact(String oldName, Contact newContact) {
        List<Contact> existingContacts = findByNameOrThrowNotFound(oldName);
        Contact existingContact = existingContacts.get(0);// mengambil kontak pertama (nama harus lengkap)

        existingContact.setName(newContact.getName());
        existingContact.setEmail(newContact.getEmail());
        existingContact.setPhone(newContact.getPhone());

        return contactRepository.save(existingContact);
    }

    @Override
    public void deleteContact(String name) {
        List<Contact> byIdOrThrowNotFound = findByNameOrThrowNotFound(name);
        contactRepository.deleteAll(byIdOrThrowNotFound);
    }
    private List<Contact> findByNameOrThrowNotFound(String name) {
        List<Contact> contacts = contactRepository.findByNameContainingIgnoreCase(name);
        if (contacts.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Contact not found");
        }
        return contacts;
    }
}
